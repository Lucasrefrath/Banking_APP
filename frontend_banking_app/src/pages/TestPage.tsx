import React from 'react';
import PrimaryButton from "../components/customUI/CustomButtons/PrimaryButton";
import SecondaryButton from "../components/customUI/CustomButtons/SecondaryButton";
import OutlineSecondaryButton from "../components/customUI/CustomButtons/OutlineSecondaryButton";
import DestructiveButton from "../components/customUI/CustomButtons/DestructiveButton";
import useAuth from "../hooks/useAuth";
import {Roles} from "../types/Enums";

const TestPage = () => {
  const { userHasRole } = useAuth();
    return (
        <div className={"flex gap-2"}>
          <PrimaryButton>
            primary
          </PrimaryButton>
          <SecondaryButton>
            secondary
          </SecondaryButton>
          <OutlineSecondaryButton>
            outline secondary
          </OutlineSecondaryButton>
          <DestructiveButton onClick={() => console.log("Destruct")} affirmationRequired={true}>
            destructive
          </DestructiveButton>
          <p>{userHasRole(Roles.VIP) && "true"}</p>
        </div>
    );
};

export default TestPage;