import materials from "@/data/materials.json";
import { Button } from "@nextui-org/button";

interface Params {
  params: {
    id: string;
  };
}

export default function EditMaterial({ params }: Params) {
  const material = materials.find(
    (material) => material.id === parseInt(params.id),
  );
  return (
    <div>
      <Button>back</Button>
      <h1>{material?.name}</h1>
      <p>{material?.quantity}</p>
      <p>{material?.price}</p>
    </div>
  );
}
