import { GateProps } from "@/app/types/GateProps";

const baseUrl = process.env.BASE_URL;

export const fetchPublicGates = async (): Promise<GateProps[]> => {
//   console.log("Base URL:", baseUrl);
  const response = await fetch(`${baseUrl}/master/gates`);

  if (!response.ok) {
    throw new Error("Failed to fetch gates");
  }

  const data = (await response.json()) as GateProps[];
  return data;
};
