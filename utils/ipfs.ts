import { create } from "ipfs-http-client";

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    Authorization: `Basic ${process.env.NEXT_PUBLIC_IPFS_API_KEY}`,
  },
});

const thegraph = create({
  host: "api.thegraph.com",
  port: 443,
  apiPath: "/ipfs/api/v0",
  protocol: "https",
});

export async function uploadFileToIpfs(content: ArrayBuffer): Promise<string> {
  const ipfsFile = await client.add({
    content,
  });
  return ipfsFile.path;
}

export async function uploadFileToTheGraph(content: ArrayBuffer): Promise<string> {
  await thegraph.add(content);
  const ipfsFile = await client.add({
    content,
  });
  return ipfsFile.path;
}


