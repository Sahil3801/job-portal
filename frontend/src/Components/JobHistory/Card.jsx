import { Badge, Button, Divider, Text } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatInterviewTime, logoFallback, timeAgo } from "../../Services/Utilities";
import { changeProfile } from "../../Slices/ProfileSlice";
import { respondToOffer } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const statusLabels = {
    APPLIED: "Applied",
    INTERVIEWING: "Interview scheduled",
    OFFERED: "Offer received",
    ACCEPTED: "Offer accepted",
    DECLINED: "Offer declined",
    REJECTED: "Not selected",
};

// props.application is the logged-in applicant's application for this job, if any
const Card = (props) => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [responding, setResponding] = useState(false);
    const application = props.application;
    const saved = profile.savedJobs?.includes(props.id);

    const handleSaveJob = () => {
        let savedJobs = [...(profile.savedJobs || [])];
        savedJobs = saved ? savedJobs.filter((job) => job !== props.id) : [...savedJobs, props.id];
        dispatch(changeProfile({ ...profile, savedJobs }));
    };

    const handleRespond = (accept) => {
        setResponding(true);
        respondToOffer(props.id, accept)
            .then(() => {
                successNotification(accept ? "Offer accepted" : "Offer declined",
                    accept ? `Congratulations! ${props.company} has been notified.` : `${props.company} has been notified.`);
                props.onUpdate?.();
            })
            .catch((err) => errorNotification("Error", err.response?.data?.errorMessage || "Could not respond to the offer."))
            .finally(() => setResponding(false));
    };

    return (
        <div className="p-4 rounded-xl bg-mine-shaft-900 border border-mine-shaft-700 w-72 sm-mx:w-full flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-white rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} onError={logoFallback} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">{props.jobTitle}</div>
                        <div className="text-xs text-mine-shaft-300">
                            <Link className="hover:underline" to={`/company/${props.company}`}>{props.company}</Link> &bull; {props.applicants ? props.applicants.length : 0} Applicants
                        </div>
                    </div>
                </div>
                <button onClick={handleSaveJob} aria-label={saved ? "Remove from saved jobs" : "Save job"}>
                    {saved
                        ? <IconBookmarkFilled className="text-bright-sun-400" stroke={1.5} />
                        : <IconBookmark className="text-mine-shaft-300 hover:text-bright-sun-400" stroke={1.5} />}
                </button>
            </div>
            <div className="flex gap-2 flex-wrap">
                {[props.experience, props.jobType, props.location].map((tag) => (
                    <div key={tag} className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">{tag}</div>
                ))}
            </div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>{props.about}</Text>
            <Divider color="gray.3" size="xs" />
            <div className="flex justify-between items-center">
                <div className="font-semibold text-mine-shaft-200">&#8377;{props.packageOffered} LPA</div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                    <IconClockHour3 className="h-5 w-5" stroke={1.5} />
                    {application ? `Applied ${timeAgo(application.timestamp)}` : `Posted ${timeAgo(props.postTime)}`}
                </div>
            </div>
            {application && (
                <div>
                    <Badge variant="outline" color="dark" size="sm">{statusLabels[application.applicationStatus]}</Badge>
                </div>
            )}
            {application?.applicationStatus === "INTERVIEWING" && application.interviewTime && (
                <div className="flex gap-1 text-sm items-center text-mine-shaft-200">
                    <IconCalendarMonth className="w-5 h-5" stroke={1.5} />
                    {formatInterviewTime(application.interviewTime)}
                </div>
            )}
            {application?.applicationStatus === "OFFERED" && (
                <div className="flex gap-2">
                    <Button loading={responding} onClick={() => handleRespond(true)} variant="filled" fullWidth>
                        Accept
                    </Button>
                    <Button loading={responding} onClick={() => handleRespond(false)} variant="outline" fullWidth>
                        Decline
                    </Button>
                </div>
            )}
            <Button component={Link} to={`/jobs/${props.id}`} color="brightSun.4" variant="light" fullWidth>
                View Job
            </Button>
        </div>
    );
};

export default Card;
