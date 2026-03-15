import React from "react";

const UserCard = ({ user }) => {
    // const { firstName, lastName, photoUrl, age, gender, about } = user;
    console.log("user Bio==", user);

    return (
        <div className="card w-56 bg-base-200 shadow-md">

            <figure className="px-4 pt-4">
                <img
                    src={user.photoUrl || "/assets/Dummy.jpg"}
                    alt="profile"
                    className="rounded-xl h-40 w-full object-cover"
                />
            </figure>

            <div className="card-body items-center text-center p-4">

                <h2 className="card-title text-lg">
                    {user.firstName + " " + user.lastName}
                </h2>
                {user.age && user.gender && <p >
                    {user.age + "" + user.gender}
                </p>}

                <p className="text-sm text-gray-500">
                    {user.about || "No bio available"}
                </p>

                <div className="card-actions justify-center mt-2 gap-2">
                    <button className="btn btn-sm btn-error">Ignore</button>
                    <button className="btn btn-sm btn-success">Interested</button>
                </div>

            </div>

        </div>
    );
};

export default UserCard;