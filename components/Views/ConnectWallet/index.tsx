import Card from "@/components/Cards";
import ConnectButton from "./ConnectButton";

type Props = {};

export default function ConnectWallet({}: Props) {
  return (
    <Card title="Connect Wallet">
      <ConnectButton />
    </Card>
  );
}
''