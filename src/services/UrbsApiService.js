import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.URBS_API_BASE ||
    "https://transporteservico.urbs.curitiba.pr.gov.br",
  timeout: 10000,
  headers: {
    Accept: "*/*",
    // "User-Agent": process.env.URBS_USER_AGENT || "insomnia/11.4.0",
  },
});

export async function getUrbsHorariosLinha(
  params = { linha: "303", c: "858ce" }
) {
  const { linha, c } = params;
  const { data } = await api.get(`/getTabelaLinha.php`, {
    params: { linha, c },
  });
  return data;
}
