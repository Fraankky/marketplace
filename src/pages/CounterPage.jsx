import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const CounterPage = () => {
  const [countInput, setCountInput] = useState(0);

  return (
    <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 fleex flex-col justify-center items-center gap-4">
      <p className="text-5xl font-bold">Count: 0</p>
      <div className="flex items-center gap-4">
        <Button size="icon">
          <Minus className="h-6 w-6" />
        </Button>
        <Button size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex gap-2 mt-8">
        <Input type="number" onChange={(e) => setCountInput(e.target.vaue)} />
        <Button>Submit</Button>
      </div>
    </main>
  );
};
export default CounterPage;
