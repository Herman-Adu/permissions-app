import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { hasPermission, Role } from "@/lib/auth/auth-rbac";

import AuthenticationFile from "../../assets/rbac-v1.png";
import HasPermissonsUsage from "../../assets/rbac-v3.png";
import ConfigurationObject from "../../assets/rbac-v5.png";
import ModeratorCantDelete from "../../assets/rbac-v7.png";
import ModeratorCanDelete from "../../assets/rbac-v6.png";
import UserCanDelete from "../../assets/rbac-v8.png";
import CanDeleteOwnComments from "../../assets/rbac-v9.png";
import UserRoleDeleteOwnComments from "../../assets/rbac-v10.png";
import ModeratorPermissions from "../../assets/basic-roles-v3.png";
import CheckHasPermissions from "../../assets/rbac-v11.png";
import TestOne from "../../assets/rbac-v12.png";
import TestOneResult from "../../assets/rbac-v13.png";

import UserResult from "../../assets/rbac-v14.png";
import NotUserResult from "../../assets/rbac-v15.png";
import AdminDeleteOnly from "../../assets/rbac-v20.png";
import AdminModeratorDeleteOnly from "../../assets/rbac-v21.png";
import UserNoDeletePermissions from "../../assets/rbac-v22.png";

// user has role of user, is author of comment and can delete it
const user: { id: string; roles: Role[] } = { roles: ["user"], id: "1" };
const authorId = "1";

// user has role of user, is not author of comment and cannot delete
//const user: { id: string; roles: Role[] } = { roles: ["user"], id: "1" };
//const authorId = "2";

// user has role of moderator and can delete any comment
//const user: { id: string; roles: Role[] } = { roles: ["moderator"], id: "2" };
//const authorId = "1";

// user has role of admin and can delete any comment
//const user: { id: string; roles: Role[] } = { roles: ["admin"], id: "3" };
//const authorId = "1";

console.log("User: ", user);

export default function RoleBaseAcceessControl() {
  return (
    <div className="flex flex-col-reverse lg:grid md:grid-cols-[6fr_2fr]">
      <div className="bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
        <h1 className="text-3xl mb-6">Role Based Access Control</h1>
        <h2 className="text-xl mb-2">Role: {user.roles}</h2>
        <Card>
          <CardHeader>Comment</CardHeader>
          <CardContent>Some random content</CardContent>
          {(hasPermission(user, "delete:comments") ||
            (hasPermission(user, "delete:ownComments") &&
              user.id === authorId)) && (
            <CardFooter>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          )}
        </Card>

        <h2 className="text-xl mt-6 mb-6">Introduction</h2>

        <div>
          <p className="mb-6">
            Switching over to a Roles based access control, means we have to
            switch over to a permission based mindset. We have to ensure our
            system is easy to scale when adding new permissions and easy to
            maintain by having your permission in one place.
          </p>

          <p className="mb-6">
            Below we have a basic authentication file that&apos;s going to do
            all of our different permission handlings for us. You can see below
            I have an object called Roles, holding all the different roles and
            permissions we have. Normally in these permission based systems, we
            break down each thing that someone can do into two parts. The first
            is going to be the action, for example view, create, update or
            delete a comment. Second is going to be the resource the thing that
            you&apos;re acting on, for example comments, to-do, products, blogs,
            articles, i.e. the things you have stored in your database that you
            want to act on. These will be our resource and the action is going
            to be the thing you want to do on that particular object.
          </p>

          <p className="mb-6">
            You can see below, in the ROLES object, all of the different
            permissions that my admin, moderator and user can have, defined in
            this configuration object. I can simply call the function
            hasPermission, and all it does is it takes in a user and it takes in
            a permission, for example view comments, create comments, update
            comments, and it&apos;s going to check for that permission on the
            user&apos;s role to see if it has that particular permission.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Image
            src={AuthenticationFile}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl mb-6"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">General Usage</h2>

        <div className="flex flex-col justify-center items-center">
          <Image
            src={HasPermissonsUsage}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl mb-6"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            The reason this is so much nicer is because it takes all of those
            complicated if checks we done in the basic permissions example, to
            see what a user can do and what they can&apos;t do based on their
            role and it confines it all to this one configuration object and now
            we have a elegant consistent way to check a user’s permissions
            against their role using hasPermission function.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Image
            src={AdminModeratorDeleteOnly}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl mb-6"
          />
        </div>

        {/* <div className="flex justify-center items-center"></div> */}

        <div>
          <p className="mt-6 mb-6">
            So as it stands now looking at the configuration object only an
            admin user can delete any comments thay we have, normally stored in
            a database.
          </p>

          <div className="flex flex-col justify-center items-center mb-6">
            <Image
              src={AdminDeleteOnly}
              alt="Admin roles"
              width={1000}
              objectFit="cover"
              className="rounded-2xl"
            />

            <Image
              src={ModeratorCantDelete}
              alt="basic roles"
              width={1000}
              objectFit="cover"
              className="rounded-2xl mt-6"
            />
          </div>

          <p className="mt-6 mb-6">
            What if you wanted a moderator to have the ability to delete
            comments. Well it&apos;s just a case of updating the configuration
            object to include the delete permission for the moderator.What makes
            this really nice is let&apos;s say in the future I decide that
            moderators cannot actually delete comments, all I have to do is come
            into this one file remove the ability for moderators to delete and
            now every other location in my code is going to work fine. Where as
            in the basic permissions example, I would have had to find and
            update all the places I used that check in the codebase.
          </p>
        </div>

        <div>
          <p className="mt-6 mb-6"></p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={ConfigurationObject}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Moderator User</h2>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={ModeratorCanDelete}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Normal Users</h2>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={UserNoDeletePermissions}
            alt="User roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            As I work through this concept you should immediately notice
            there&apos;s some limitations with this system that we didn&apos;t
            have with the basic permissions example. The main RBAC limitation is
            that it&apos;s very difficult for us to do any type of roles based
            on particular attributes of our objects that we&apos;re checking.
            For example our basic example, we had it that a user that had the
            same Id as the author has permissions to delete comments
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
            There&apos;s a few ways to get around this, the main way for a
            simple use case, where all you&apos;re doing is checking can they
            delete their own comment, you can add in a new permission called own
            delete or own update.
          </p>

          <p className="mt-6 mb-6">
            Looking at the roles config object you can see that I have added 2
            new permissions to the user roles for deleting and updating their
            own comments.{" "}
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={UserCanDelete}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            Then I added a check, first if the user can delete any comments,
            second if the user can delete their own comments and finally, is
            this particular comment their own
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={CanDeleteOwnComments}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={UserRoleDeleteOwnComments}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            One of the reasons of building a prototype like this is now I get to
            use it as a playground, integrating different authorisation
            strategies, giving a great visual to better understanding best
            practise with regards to implementing permissions across a codebase,
            developer mindset, maintainability, scalability and the trials and
            tribulations of each system you may face during your implementation,
            and why you should choose one system over the over.
          </p>
        </div>

        <div>
          <h2 className="text-xl mt-6 mb-6 text-left">
            User&apos;s Own comment
          </h2>
          <div className="flex  flex-col gap-6 justify-center items-center mb-6">
            <Image
              src={TestOne}
              alt="basic roles"
              width={1000}
              objectFit="cover"
              className="rounded-2xl"
            />
            <Image
              src={TestOneResult}
              alt="basic roles"
              width={1000}
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl mt-6 mb-6 text-left">
            Different User&apos;s comment
          </h2>
          <div className="flex  flex-col gap-6 justify-center items-center mb-6">
            <Image
              src={UserResult}
              alt="basic roles"
              width={1000}
              objectFit="cover"
              className="rounded-2xl"
            />
            <Image
              src={NotUserResult}
              alt="basic roles"
              width={1000}
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div>
          <p className="mt-6 mb-6">
            Even with all of these changes you can see that this system still
            has quite a lot of code that you need to write to check the
            permission especially when we&apos;re dealing with can they delete
            their own comments and if we were to add even more stipulations for
            example you can only delete things that don&apos;t have particular
            statuses. So imagine a blog article, once it goes to a published
            status you can now no longer delete or update it so that&apos;s
            another check that you need to add in which requires you to add more
            permissions.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={CheckHasPermissions}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mt-6 mb-6">
            As you can see the system very quickly spirals out of control it
            works great for relatively simple systems but as soon as you get
            more complex it becomes very limited. Leading us into the final
            permission system we are going to build and discuss, Attribute Based
            Role Access
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
