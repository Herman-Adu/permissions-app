import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const user = { role: "admin", id: "1" };
const authorId = "1";

export default function RbacPage() {
  return (
    <div className="container, mx-auto px-4 my-6">
      <h1 className="text-3xl mb-6">Basic Permissions</h1>
      <Card>
        <CardHeader>Comment</CardHeader>
        <CardContent>Some random content</CardContent>
        {(user.role === "admin" ||
          user.role === "moderator" ||
          user.id === authorId) && (
          <CardFooter>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
