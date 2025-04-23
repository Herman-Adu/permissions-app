import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import BasicPermissions from "../../assets/basic-roles-v2.png";
import ModeratorPermissions from "../../assets/basic-roles-v3.png";
import AuthorIdPermissions from "../../assets/basic-moderator-v8.png";
import DeleteButtonPermissions from "../../assets/basic-moderator-v7.png";
import Link from "next/link";

const user = { role: "admin", id: "1" };
const authorId = "2";

export default function BasicPermissionPage() {
  return (
    <div className="flex flex-col-reverse lg:grid md:grid-cols-[6fr_2fr]">
      <div className="bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
        <h1 className="text-3xl mb-6">Basic Permissions</h1>
        <h2 className="text-xl mb-2">Role: {user.role}</h2>
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

        <h2 className="text-xl mt-6 mb-6">Introduction</h2>

        <div>
          <p className="mb-6">
            The code below shows a simple comment on a page and if you&apos;re
            an admin user you have the ability to delete this comment, as seen
            above. The delete button is visable straightforward.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={BasicPermissions}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            But what happens if I want to add in a new role for example a
            moderator role. A moderator should probably have the ability to
            delete comments too, so now I need to add another check to see if
            the user role is equal to moderator and if that is true or if their
            role is admin then the delete button should show up so now it
            doesn&apos;t matter which of those two roles they have they can
            delete this. I also probably want users to be able to delete their
            own comment so I&apos;m going to do another or check for example say
            userId is equal to the authorId
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={ModeratorPermissions}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            You can see that I have a user that created this comment but if
            I&apos;m a different user that did not create the comment you can
            now see I cannot delete it as there is no button shown below. You
            can see how quickly this easily spirals out of control, because now
            I have multiple levels of if checks all joined together with
            OR&apos;s and AND operators making this a complicated large query
            and now if I need to change any of the permissions for example I
            want to change what my moderator can do so that they can no longer
            delete comments, I need to come to every single place I added this
            if check in the code and modify it, making it incredibly difficult
            to add and modify permissions across your code base
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={AuthorIdPermissions}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={DeleteButtonPermissions}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            A better way would be to go add all your permissions in a
            configuration file or a specific permissions file, rather than have
            all your permissions and all of the stuff related to them littered
            throughout the entire code base so the very first permission system
            that we can move to, to move away from this Role based system is{" "}
            <Link href="/rbac" className="underline hover:no-underline">
              Role Base Access Control
            </Link>
          </p>
        </div>
      </div>

      <aside className="bg-white/50 rounded-xl py-7 px-8 m-6  h-fit w-fit hidden md:block">
        <h1 className="text-2xl mb-6">Table of contents</h1>
        <p className="mt-6 mb-6 text-transparent">
          As you can see the system very quickly spirals out of control it works
          great for relatively simple systems but as soon as you get more
          complex it becomes very limited. Leading us into the final permission
          system we are going to build and discuss, Attribute Based Role Access
        </p>
      </aside>
    </div>
  );
}
