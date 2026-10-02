import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import CertiInput from "./CertiInput";
import CertiCard from "./CertiCard";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";

const Certification = () => {
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-4 flex justify-between text-mine-shaft-50">
        Certifications
        <div className="flex gap-2">
          <ActionIcon
            onClick={() => setAddCerti(true)}
            variant="subtle"
            color="brightSun.4"
            size="lg"
          >
            <IconPlus className="w-4/5 h-4/5" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            color={edit ? "red.8" : "gray.7"}
            size="lg"
          >
            {edit ? (
              <IconX className="w-4/5 h-4/5" stroke={1.5} />
            ) : (
              <IconPencil className="w-4/5 h-4/5" stroke={1.5} />
            )}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {profile?.certifications?.map((certi, index) => (
          <CertiCard edit={edit} index={index} key={index} {...certi} />
        ))}
        {addCerti && <CertiInput add setEdit={setAddCerti} />}
      </div>
    </div>
  );
};

export default Certification;
