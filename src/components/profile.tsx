import { Key, MailIcon } from "lucide-react";
import { Button } from "./ui/button";

const Profile = () => {
  return (
    <div className="space-y-6 max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Профиль</h1>
      <div className="space-y-3 border border-muted rounded-md p-4">
        <p className="flex items-center gap-2">
          {" "}
          <MailIcon className="h-6 w-6" /> Ваш Email
        </p>
        <p className="text-muted-foreground">
          {" "}
          miirj4f934nfmnvg49nv9nvu@gmail.com
        </p>
      </div>

      <div className="space-y-3 border border-muted rounded-md p-4">
        <p className="flex items-center gap-2">
          {" "}
          <Key className="h-6 w-6" /> Ваш ID
        </p>
        <p className="text-muted-foreground">miirj4f934nfmnvg49nv9nvu</p>
      </div>

      <Button
        type="submit"
        className="w-full bg-background text-foreground border border-muted hover:bg-accent"
      >
        Выйти
      </Button>
    </div>
  );
};

export default Profile;
