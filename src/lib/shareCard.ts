/**
 * Card de resultado para story, 1080×1920.
 *
 * Não é print da tela: a tela de resultado tem ~3.000px de altura e viraria uma
 * tira comprida que o Instagram corta. Aqui a imagem é desenhada do zero no
 * formato certo.
 *
 * Canvas em vez de html2canvas/html-to-image de propósito — essas bibliotecas
 * pesam ~200 kB e erram justamente no que o quiz usa (variáveis CSS, fontes do
 * Google, SVG), e erram em silêncio: renderizam a fonte errada sem avisar.
 */

const L = 1080;
const A = 1920;

/**
 * O Instagram cobre o topo e a base do story com a própria interface — barra de
 * progresso e avatar em cima, "Enviar mensagem" embaixo. Fora desta faixa o
 * conteúdo fica atrás da UI, e a assinatura era o primeiro a sumir.
 */
const SEGURO_TOPO = 250;
const SEGURO_BASE = 1670;

/** Mesmos valores de `index.css`, em hex porque canvas não lê variável CSS. */
const COR = {
  creme: "#F7F5F0",
  preto: "#171717",
  vermelho: "#E76F51",
  vermelhoEscuro: "#A5381D",
  muted: "#67615B",
  inkMuted: "#B3ADA3",
  borda: "#D5CFC5",
} as const;

const DISPLAY = '"Bricolage Grotesque"';
const SANS = "Inter";
const MONO = '"JetBrains Mono"';

export interface ShareCardData {
  profileName: string;
  profileText: string;
  secondary?: string;
  areas: { name: string; score: number }[];
  url: string;
  /** Sem áreas ou baixa confiança: o card não finge um pódio. */
  inconclusive: boolean;
}

/**
 * Sem isto o canvas desenha em Arial e o card sai fora da marca — e sem erro
 * nenhum, que é o pior jeito de falhar.
 */
async function carregarFontes(): Promise<void> {
  if (!document.fonts) return;
  await Promise.all([
    document.fonts.load(`800 120px ${DISPLAY}`),
    document.fonts.load(`700 44px ${DISPLAY}`),
    document.fonts.load(`400 34px ${SANS}`),
    document.fonts.load(`400 26px ${MONO}`),
  ]);
  await document.fonts.ready;
}

/** Quebra o texto na largura disponível e devolve as linhas. */
function quebrar(ctx: CanvasRenderingContext2D, texto: string, largura: number): string[] {
  const linhas: string[] = [];
  let atual = "";
  for (const palavra of texto.split(" ")) {
    const tentativa = atual ? `${atual} ${palavra}` : palavra;
    if (ctx.measureText(tentativa).width > largura && atual) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = tentativa;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

/**
 * Acha o maior corpo em que o texto cabe no número de linhas disponível.
 *
 * Os 9 perfis têm descrições de comprimentos bem diferentes. Fixar o corpo
 * fazia o texto longo ser cortado no meio da frase — pior que ficar pequeno.
 */
function ajustarParaLinhas(
  ctx: CanvasRenderingContext2D,
  texto: string,
  largura: number,
  maxLinhas: number,
  tamanhos: number[],
  familia: string,
): { tamanho: number; linhas: string[] } {
  for (const tamanho of tamanhos) {
    ctx.font = `400 ${tamanho}px ${familia}`;
    const linhas = quebrar(ctx, texto, largura);
    if (linhas.length <= maxLinhas) return { tamanho, linhas };
  }
  const tamanho = tamanhos[tamanhos.length - 1];
  ctx.font = `400 ${tamanho}px ${familia}`;
  return { tamanho, linhas: quebrar(ctx, texto, largura).slice(0, maxLinhas) };
}

/**
 * Diminui a fonte até o texto caber.
 *
 * "Technical Writing, Documentação & DevRel" tem o dobro da largura de "Dados
 * & BI" — sem isto, o nome da área vaza do card.
 */
function ajustarParaCaber(
  ctx: CanvasRenderingContext2D,
  texto: string,
  largura: number,
  tamanhoInicial: number,
  familia: string,
  peso: string,
  tamanhoMinimo: number,
): number {
  let tamanho = tamanhoInicial;
  ctx.font = `${peso} ${tamanho}px ${familia}`;
  while (ctx.measureText(texto).width > largura && tamanho > tamanhoMinimo) {
    tamanho -= 2;
    ctx.font = `${peso} ${tamanho}px ${familia}`;
  }
  return tamanho;
}

export async function gerarCardDeResultado(dados: ShareCardData): Promise<Blob | null> {
  try {
    await carregarFontes();

    const canvas = document.createElement("canvas");
    canvas.width = L;
    canvas.height = A;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const margem = 90;
    const util = L - margem * 2;

    // ---------- fundo ----------
    ctx.fillStyle = COR.creme;
    ctx.fillRect(0, 0, L, A);

    // ---------- bloco preto ----------
    // a faixa preta pode encostar na borda; o texto dentro dela, não
    const alturaBloco = 880;
    ctx.fillStyle = COR.preto;
    ctx.fillRect(0, 0, L, alturaBloco);

    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = COR.inkMuted;
    ctx.font = `400 26px ${MONO}`;
    ctx.fillText("// resultado.java", margem, SEGURO_TOPO + 40);

    ctx.fillText("SEU PERFIL", margem, 400);

    // nome do perfil: o maior elemento do card
    const tamanhoNome = ajustarParaCaber(
      ctx,
      dados.profileName.toUpperCase(),
      util,
      132,
      DISPLAY,
      "800",
      72,
    );
    ctx.fillStyle = COR.vermelho;
    ctx.font = `800 ${tamanhoNome}px ${DISPLAY}`;
    ctx.fillText(dados.profileName.toUpperCase(), margem, 400 + tamanhoNome + 30);

    let y = 400 + tamanhoNome + 30;

    if (dados.secondary) {
      y += 70;
      ctx.fillStyle = COR.inkMuted;
      ctx.font = `400 28px ${MONO}`;
      ctx.fillText(`com um traço forte de ${dados.secondary}`, margem, y);
    }

    // descrição do perfil, cortada para não estourar o bloco
    ctx.fillStyle = "#EDEAE4";
    // 4 linhas cabem na faixa preta, e permitir a quarta mantém o corpo em
    // 34px: com o limite de 3, os perfis mais longos caíam pra 26px, pequeno
    // demais pra um story que se lê de relance
    const desc = ajustarParaLinhas(ctx, dados.profileText, util, 4, [34, 32, 30, 28], SANS);
    ctx.font = `400 ${desc.tamanho}px ${SANS}`;
    y += 78;
    for (const linha of desc.linhas) {
      ctx.fillText(linha, margem, y);
      y += Math.round(desc.tamanho * 1.45);
    }

    // ---------- áreas ----------
    const yRodape = 1500;
    const yTitulo = alturaBloco + 110;

    ctx.fillStyle = COR.muted;
    ctx.font = `400 26px ${MONO}`;
    ctx.fillText(
      dados.inconclusive ? "POR ONDE COMEÇAR A OLHAR" : "ÁREAS PRA EXPLORAR",
      margem,
      yTitulo,
    );

    // centraliza o grupo no espaço livre: com 1 ou 2 áreas, ancorar no topo
    // deixava um buraco entre elas e o rodapé
    const ALTURA_AREA = 130;
    const inicioPossivel = yTitulo + 90;
    // altura real do grupo: do topo do primeiro selo à base da última barra.
    // Usar `n * ALTURA_AREA` superestimava e empurrava tudo pra cima.
    const alturaGrupo = Math.max(0, dados.areas.length - 1) * ALTURA_AREA + 94;
    const folga = yRodape - 50 - inicioPossivel - alturaGrupo;
    y = inicioPossivel + Math.max(0, folga / 2);

    if (dados.areas.length === 0) {
      // sem pódio: o card diz o mesmo que a tela, em vez de inventar áreas
      ctx.fillStyle = COR.preto;
      ctx.font = `400 38px ${SANS}`;
      for (const linha of quebrar(
        ctx,
        "Minhas respostas ainda não apontaram pra um lado. Faz o seu e vê o que dá.",
        util,
      )) {
        ctx.fillText(linha, margem, y);
        y += 54;
      }
    }

    dados.areas.slice(0, 3).forEach((area, i) => {
      const topo = y + i * ALTURA_AREA;

      // número em bloco vermelho no primeiro, contorno nos demais
      const ladoChip = 52;
      if (i === 0) {
        ctx.fillStyle = COR.vermelho;
        ctx.fillRect(margem, topo - 38, ladoChip, ladoChip);
        ctx.fillStyle = COR.preto;
      } else {
        ctx.strokeStyle = COR.borda;
        ctx.lineWidth = 2;
        ctx.strokeRect(margem, topo - 38, ladoChip, ladoChip);
        ctx.fillStyle = COR.muted;
      }
      ctx.font = `500 24px ${MONO}`;
      ctx.fillText(String(i + 1).padStart(2, "0"), margem + 10, topo - 2);

      // nota à direita, e o nome ocupa o resto
      ctx.fillStyle = COR.muted;
      ctx.font = `400 28px ${MONO}`;
      const nota = String(Math.round(area.score));
      const larguraNota = ctx.measureText(nota).width;
      ctx.fillText(nota, L - margem - larguraNota, topo);

      const larguraNome = util - ladoChip - 30 - larguraNota - 30;
      const tamanhoNomeArea = ajustarParaCaber(ctx, area.name, larguraNome, 46, DISPLAY, "700", 26);
      ctx.fillStyle = COR.preto;
      ctx.font = `700 ${tamanhoNomeArea}px ${DISPLAY}`;
      ctx.fillText(area.name, margem + ladoChip + 30, topo);

      // barra de afinidade
      // afastada do nome de propósito: colada, lia como sublinhado
      const yBarra = topo + 46;
      const larguraBarra = util - ladoChip - 30;
      ctx.fillStyle = COR.borda;
      ctx.fillRect(margem + ladoChip + 30, yBarra, larguraBarra, 10);
      ctx.fillStyle = COR.vermelho;
      ctx.fillRect(
        margem + ladoChip + 30,
        yBarra,
        (larguraBarra * Math.max(0, Math.min(100, area.score))) / 100,
        10,
      );
    });

    // ---------- rodapé ----------
    ctx.strokeStyle = COR.borda;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margem, yRodape);
    ctx.lineTo(L - margem, yRodape);
    ctx.stroke();

    ctx.fillStyle = COR.muted;
    ctx.font = `400 28px ${SANS}`;
    ctx.fillText("faça o seu:", margem, yRodape + 50);

    const tamanhoUrl = ajustarParaCaber(ctx, dados.url, util, 34, MONO, "500", 18);
    ctx.fillStyle = COR.vermelhoEscuro;
    ctx.font = `500 ${tamanhoUrl}px ${MONO}`;
    ctx.fillText(dados.url, margem, yRodape + 95);

    ctx.fillStyle = COR.preto;
    ctx.font = `700 40px ${DISPLAY}`;
    ctx.fillText("dudadias.java", margem, SEGURO_BASE - 15);

    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((blob) => resolve(blob), "image/png"),
    );
  } catch {
    // navegador sem canvas, fonte que não carregou, memória: cai pro texto
    return null;
  }
}
