import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { successNotification } from "../../Services/NotificationService";

const Skills = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [skills, setSkills] = useState([]);
    const [edit, setEdit] = useState(false);

    const handleClick = () => {
        if (!edit) {
            setSkills(profile.skills);
            setEdit(true);
        } else {
            setEdit(false);
        }
    };

    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, skills: skills };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Skills Updated Successfully");
    };

    return (
        <div>
            <div className="text-2xl font-semibold mb-3 flex justify-between text-mine-shaft-50">
                Skills
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
                <TagsInput
                    placeholder="Add skill"
                    value={skills}
                    onChange={setSkills}
                    splitChars={[",", " ", "|"]}
                />
            ) : (
                <div className="flex flex-wrap gap-2">
                    {profile?.skills?.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-bright-sun-50 rounded-3xl px-3 py-1 text-sm font-medium text-bright-sun-400"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Skills;
