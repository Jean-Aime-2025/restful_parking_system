import { Button } from "@/components/ui/button";
import { MoveLeft, SearchX, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-6 relative">
      <WifiOff size={70} className="absolute top-10 left-10 rotate-12" />
      
      <h1 className="text-8xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-400 text-4xl">The page you're looking for doesn't exist.</p>
      
      <Button
        onClick={() => navigate(-1)} 
        className="mt-6 py-5 text-white rounded-lg transition"
      >
        <MoveLeft/>
        Go Back
      </Button>
      
      <SearchX size={70} className="absolute bottom-10 right-10" />
    </div>
  );
}

