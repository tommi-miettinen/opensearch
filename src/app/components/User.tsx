import { UserData } from "../types";

interface UserProps {
  user: UserData;
}

const User = ({ user }: UserProps) => {
  return (
    <div className="p-8 flex flex-col gap-4 text-white w-[400px] rounded-xl bg-neutral-950">
      <div className="flex items-center gap-4">
        <img className="rounded-full border h-[60px] w-[60px]" src={user.image} />
        <span className="text-xl">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <div>
        <div>{user.firstName}</div>
        <div>
          {user.address.address}, {user.address.city}
        </div>
        <div>{user.age}</div>
      </div>
    </div>
  );
};

export default User;
