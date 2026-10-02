import { ActionIcon } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpInput from "./ExpInput";
import ExpCard from "./ExpCard";

const Experience = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-4 flex justify-between text-mine-shaft-50">
        Experience
        <div className="flex gap-2">
          <ActionIcon
            onClick={() => setAddExp(true)}
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
        {profile?.experiences?.map((exp, index) => (
          <ExpCard edit={edit} index={index} key={index} {...exp} />
        ))}
        {addExp && <ExpInput add setEdit={setAddExp} />}
      </div>
    </div>
  );
};

export default Experience;
