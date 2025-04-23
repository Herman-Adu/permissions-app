import Image from "next/image";
import TestOneResult from "../assets/rbac-v13.png";

export default function HomePage() {
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-[6fr_2fr]">
      <div className="bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
        <h1 className="text-2xl mb-6">Introduction</h1>
        <div>
          <p className="mb-6">
            Hello and welcome, My name is Herman Adu and today I will showcase a
            few types of permission systems we can implement in our react based
            applications. Using this simple but effective prototype, I show a
            user&apos;s role and a comment which has a delete button. Based on
            the permissions associated with the users role, will determine if
            the user can delete the comment by showing or hiding a delete
            button.
          </p>

          <div className="flex justify-center">
            <Image
              src={TestOneResult}
              alt="basic roles"
              width={1000}
              objectFit="cover"
              className="rounded-2xl mb-6"
            />
          </div>

          <p className="mb-6">
            This application is split into a number of public and private
            routes, to help better describe concepts on authentication and
            permissions, as well as reflect real world applications and
            scenarios.
          </p>
        </div>

        <div className="mt-6 mb-6">
          <ul className="list-disc list-inside ml-12">
            <li>Basic Permission Objects</li>
            <li>Role Based Access Control (RBAC)</li>
            <li>Clerk Authentication (RBAC)</li>
            <li>Attribute Based Access Control (ABAC)</li>
          </ul>
        </div>

        <div>
          <p className="mb-6">
            Authentication and Authorisation, are two essential terms used in
            the context of access control, and more specifically,
            Identity-Access-Management (IAM). Understanding the difference
            between the two is absolutely crucial. Combined, Authentication and
            authorisation determine the security of your application, and it is
            not secure unless you have configured both correctly.
          </p>
        </div>

        <h2 className="text-xl mb-6">What is Authentication?</h2>

        <div>
          <p className="mb-6">
            Authentication is the first step in the process of access control.
            It involves verifying the identity of a user, device, or other
            entity in a computer system, often as a prerequisite to granting
            access to resources in that system. Common authentication methods
            include passwords, Multi-factor authentication (MFA), biometric
            data, and OTPs (One-Time Passwords).
          </p>

          <p className="mb-6">
            For instance, consider token-based authentication, a popular method
            in modern web applications. Token-based authentication works by
            issuing a token upon the successful verification of credentials.
            This token, usually a cryptographically signed piece of data, is
            then used to access the application, replacing the need for repeated
            username and password inputs.
          </p>

          <p className="mb-6">Leading authentication services include:</p>

          <ul className="list-disc list-inside ml-12">
            <li>Clerk</li>
            <li>Kinde</li>
            <li>Auth0</li>
            <li>AWS</li>
            <li>Cognito</li>
          </ul>
        </div>

        <h2 className="text-xl mt-6 mb-6">What is Authorisation?</h2>

        <div>
          <p className="mb-6">
            After authentication, the system must determine what an
            authenticated user can do. This is where authorisation comes in.
            authorisation is the process of establishing permissions for a user
            determining the operations that they can perform.
          </p>

          <p className="mb-6">
            Permission models for authorisation vary widely. Role-Based Access
            Control (RBAC) is a common model where access rights are grouped by
            roles, and users are assigned roles based on their responsibilities.
            This model simplifies managing user permissions, especially in large
            organizations where many users have overlapping access needs.
          </p>

          <p className="mb-6">Other common policy models include</p>

          <ul className="list-disc list-inside ml-12">
            <li>Attribute Based Access Control (ABAC)</li>
            <li>policy-based access control (PBAC)</li>
            <li>Relationship-Based Access Control (ReBAC)</li>
          </ul>

          {/* <p className="mb-6"></p> */}
        </div>

        <h2 className="text-xl mt-6 mb-6">What is Clerk?</h2>

        <div>
          <p className="mb-6">
            Clerk provides a comprehensive solution for user authentication and
            management, offering both ready-to-use UI components and flexible
            APIs for web applications. It handles the full session lifecycle,
            including secure user login, sign-up, and user profile management.
            In essence, Clerk is a powerful and user-friendly platform that
            simplifies authentication and user management for web developers,
            enabling them to build secure and scalable applications
          </p>

          {/* <p className="mb-6"></p> */}
        </div>

        <h2 className="text-xl mt-6 mb-6">Why use Clerk?</h2>

        <div>
          <p className="mb-6">
            <span className="font-semibold">Simplified Development: </span>
            Clerk simplifies the development process by handling the
            complexities of authentication and user management, allowing
            developers to focus on building their core product features.
          </p>

          <p className="mb-6">
            <span className="font-semibold">Enhanced Security: </span>
            Clerk provides robust security features, including multi-factor
            authentication and secure session management, ensuring a secure
            environment for users and developers.
          </p>

          <p className="mb-6">
            <span className="font-semibold">Scalability and Flexibility: </span>
            Clerk&apos;s flexible APIs and comprehensive features make it a
            scalable and versatile solution for applications of various sizes
            and complexities
          </p>

          <p className="mb-6">
            <span className="font-semibold"></span>
          </p>

          <p className="mb-6">
            <span className="font-semibold"></span>
          </p>

          <p className="mb-6"></p>
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
