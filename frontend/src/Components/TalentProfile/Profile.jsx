import { formatExperience } from "../../Services/Utilities";
import { Avatar, Button, Divider, Pill } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { hideOverlay, showOverlay } from "../../Slices/OverlaySlice";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const matches = useMediaQuery('(max-width: 475px)');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showOverlay());
        window.scrollTo(0, 0);
        getProfile(id)
            .then((res) => {
                setProfile(res);
            })
            .catch((err) => console.log(err))
            .finally(() => dispatch(hideOverlay()));
    }, [id]);

    return (
        <div className="w-2/3 lg-mx:w-full">
            <div>
                <div className="relative">
                    <img
                        className="rounded-t-2xl w-full h-48 xs-mx:h-32 object-cover"
                        src="/Profile/banner.jpg"
                        alt=""
                    />
                    <div className="absolute flex items-center justify-center !rounded-full -bottom-16 xs-mx:-bottom-12 left-6">
                        <Avatar
                            className="!w-32 !h-32 xs-mx:!w-24 xs-mx:!h-24 border-white border-4 rounded-full shadow-sm"
                            src={
                                profile?.picture
                                    ? `data:image/jpeg;base64,${profile?.picture}`
                                    : '/avatar.png'
                            }
                            alt=""
                        />
                    </div>
                </div>
                <div className="px-3 mt-20 xs-mx:mt-16">
                    <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between items-center gap-3 text-mine-shaft-50">
                        {profile?.name}{' '}
                        <Button component="a" href={`mailto:${profile?.email}`} size={matches ? 'sm' : 'md'} color="brightSun.4" variant="light">
                            Message
                        </Button>
                    </div>
                    <div className="text-xl xs-mx:text-base flex gap-1 items-center">
                        <IconBriefcase className="h-5 w-5" stroke={1.5} />
                        {profile?.jobTitle} &bull; {profile?.company}
                    </div>
                    <div className="text-lg flex xs-mx:text-base gap-1 items-center text-mine-shaft-300">
                        <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile?.location}
                    </div>
                    <div className="text-lg xs-mx:text-base flex gap-1 items-center text-mine-shaft-300">
                        <IconBriefcase className="h-5 w-5" stroke={1.5} /> Experience: {formatExperience(profile?.totalExp)}
                    </div>
                    <Divider my="xl" />
                    <div>
                        <div className="text-2xl font-semibold mb-3">About</div>
                        <div className="text-sm text-mine-shaft-300 text-justify">{profile?.about}</div>
                    </div>
                    <Divider my="xl" />
                    <div>
                        <div className="text-2xl font-semibold mb-3">Skills</div>
                        <div className="flex flex-wrap gap-2">
                            {profile?.skills?.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-bright-sun-300 rounded-3xl px-3 py-1 text-sm font-medium bg-opacity-15 text-bright-sun-400"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Divider my="xl" />
                    <div>
                        <div className="text-2xl font-semibold mb-4">Experience</div>
                        <div className="flex flex-col gap-8">
                            {profile?.experiences?.map((exp, index) => (
                                <ExpCard key={index} {...exp} />
                            ))}
                        </div>
                    </div>
                    <Divider my="xl" />
                    <div>
                        <div className="text-2xl font-semibold mb-4">Certifications</div>
                        <div className="flex flex-col gap-8">
                            {profile?.certifications?.map((certi, index) => (
                                <CertiCard key={index} {...certi} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
