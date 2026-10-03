import { Anchor, Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconMapPin } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";
import { formatInterviewTime, openPDF, formatExperience } from "../../Services/Utilities";
import { changeAppStatus } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const TalentCard = (props) => {
    const { id } = useParams();
    const ref = useRef(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [profile, setProfile] = useState(null);

    const [saving, setSaving] = useState(false);

    const handleOffer = (status) => {
        let interview = { id, applicantId: props.applicantId, applicationStatus: status };
        if (status === "INTERVIEWING") {
            if (!date || !time) {
                errorNotification('Missing details', 'Please pick both a date and a time.');
                return;
            }
            const [hours, minutes] = time.split(':').map(Number);
            const interviewTime = new Date(date);
            interviewTime.setHours(hours, minutes, 0, 0);
            interview = { ...interview, interviewTime };
        }
        setSaving(true);
        changeAppStatus(interview)
            .then(() => {
                if (status === "INTERVIEWING") successNotification('Interview scheduled', `${props.name} has been invited to an interview.`);
                else if (status === "OFFERED") successNotification('Offer sent', `${props.name} has been offered the job.`);
                else successNotification('Application rejected', `${props.name} has been notified.`);
                close();
                props.onUpdate?.();
            })
            .catch((err) => {
                console.log(err);
                errorNotification('Error', err.response?.data?.errorMessage || 'Could not update the application.');
            })
            .finally(() => setSaving(false));
    };

    useEffect(() => {
        if (props.applicantId) {
            getProfile(props.profileId ?? props.applicantId)
                .then((res) => {
                    setProfile(res);
                })
                .catch((err) => console.log(err));
        } else {
            setProfile(props);
        }
    }, [props]);

    return (
        <div className="p-4 rounded-xl bg-mine-shaft-900 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 transition duration-300 ease-in-out w-96 bs-mx:w-[48%] md-mx:w-full flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-full">
                        <Avatar className="rounded-full" size="lg" src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : '/avatar.png'} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-lg">{props?.name}</div>
                        <div className="text-sm text-mine-shaft-300">{profile?.jobTitle} &bull; {profile?.company}</div>
                    </div>
                </div>
                
            </div>
            <div className="flex gap-2 flex-wrap">
                {profile?.skills?.map((skill, index) => index < 4 && <div key={index} className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">{skill}</div>)}
            </div>
            <div>
                <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>{profile?.about}</Text>
            </div>
            <Divider color="gray.3" size="xs" />
            {props.invited ? (
                <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                    <IconCalendarMonth stroke={1.5} /> Interview: {formatInterviewTime(props.interviewTime)}
                </div>
            ) : (
                <div className="flex justify-between">
                    <div className="font-medium text-mine-shaft-200">Exp: {formatExperience(profile?.totalExp)}</div>
                    <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
                        <IconMapPin className="h-5 w-5" /> {profile?.location}
                    </div>
                </div>
            )}
            <Divider color="gray.3" size="xs" />
            <div className="flex [&>*]:w-1/2 [&>*]:p-1">
                {!props.invited && (
                    <>
                        <Link to={`/talent-profile/${profile?.id}`}>
                            <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
                        </Link>
                        <div>
                            {props.posted ? (
                                <Button color="brightSun.4" variant="light" onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} fullWidth>Schedule</Button>
                            ) : (
                                <Button component="a" href={`mailto:${profile?.email}`} color="brightSun.4" variant="light" fullWidth>Message</Button>
                            )}
                        </div>
                    </>
                )}
                {props.invited && (
                    <>
                        <div>
                            <Button loading={saving} onClick={() => handleOffer("OFFERED")} color="brightSun.4" variant="outline" fullWidth>Accept</Button>
                        </div>
                        <div>
                            <Button loading={saving} onClick={() => handleOffer("REJECTED")} color="brightSun.4" variant="light" fullWidth>Reject</Button>
                        </div>
                    </>
                )}
            </div>
            {props.applicationStatus === "ACCEPTED" && <div className="text-sm font-medium text-green-700">Offer accepted by the applicant</div>}
            {props.applicationStatus === "DECLINED" && <div className="text-sm font-medium text-red-700">Offer declined by the applicant</div>}
            {(props.invited || props.posted) && <Button color="brightSun.4" variant="filled" onClick={openApp} autoContrast fullWidth>View Application</Button>}
            <Modal opened={opened} onClose={close} radius="lg" title="Schedule Interview" centered>
                <div className="flex flex-col gap-4">
                    <DateInput value={date} onChange={setDate} minDate={new Date()} label="Date" placeholder="Enter Date" />
                    <TimeInput label="Time" ref={ref} value={time || ""} onChange={(event) => setTime(event.currentTarget.value)} onClick={() => ref.current?.showPicker?.()} />
                    <Button loading={saving} onClick={() => handleOffer("INTERVIEWING")} color="brightSun.4" variant="filled" fullWidth>Schedule</Button>
                </div>
            </Modal>
            <Modal opened={app} onClose={closeApp} radius="lg" title="Application" centered>
                <div className="flex flex-col gap-4">
                    <div>Email: &emsp;<a className="text-bright-sun-400 hover:underline cursor-pointer" href={`mailto:${props?.email}`}>{props?.email}</a></div>
                    <div>Website: &emsp;<a className="text-bright-sun-400 hover:underline cursor-pointer" target="_blank" rel="noreferrer" href={props.website}>{props.website}</a></div>
                    <div>Resume: &emsp;<span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={() => openPDF(props.resume)}>{props.name}</span></div>
                    <div>Cover Letter: &emsp;<div className="text-wrap">{props.coverLetter}</div></div>
                </div>
            </Modal>
        </div>
    );
};

export default TalentCard;
