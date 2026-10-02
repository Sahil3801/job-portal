import { ActionIcon, Textarea } from "@mantine/core";
import {
  IconCheck,
  IconDeviceFloppy,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const About = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [about, setAbout] = useState("");
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    if (!edit) {
      setAbout(profile.about);
      setEdit(true);
    } else setEdit(false);
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, about: about };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "About Updated Successfully");
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between text-mine-shaft-50  ">
        About
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              variant="subtle"
              color="green.8"
              size="lg"
            >
              <IconCheck className="w-4/5 h-4/5" stroke={1.5} />
            </ActionIcon>
          )}
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
      {edit ? (
        <Textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          autosize
          minRows={2}
          placeholder="Enter about yourself"
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile.about}
        </div>
      )}
    </div>
  );
};

export default About;
