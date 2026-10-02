import { Avatar, Divider, Tabs } from "@mantine/core";
import { IconMapPin} from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

const Company = () => {
    const section=["About", "Jobs", "Employees"]
    return <div className="w-3/4 lg-mx:w-full">
        <div className="relative">
            <img className="rounded-t-2xl w-full h-48 xs-mx:h-32 object-cover" src="/Profile/banner.jpg" alt="" />
            <img className="w-28 h-28 xs-mx:w-24 xs-mx:h-24 p-3 bg-white border border-mine-shaft-700 shadow-sm absolute -bottom-14 xs-mx:-bottom-12 left-5 rounded-3xl" src="/Icons/Google.png" alt="Google logo" />
        </div>
        <div className="px-5 mt-20 xs-mx:mt-16">
            <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between items-center gap-3 flex-wrap text-mine-shaft-50">Google <Avatar.Group >
                <Avatar src="/avatar.png" />
                <Avatar src="/avatar1.png" />
                <Avatar src="/avatar2.png" />
                <Avatar color="brightSun" variant="filled" className="[&>span]:!text-xs">+10k</Avatar>
            </Avatar.Group></div>
            <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                <IconMapPin className="h-5 w-5" stroke={1.5} /> New York, United States
            </div>
        </div>
        <Divider my="xl"/>
        <div>
            <Tabs  variant="outline"  radius="md" defaultValue={section[0].toLowerCase()}>
                <Tabs.List className="font-semibold [&_button]:!text-lg xs-mx:[&_button]:!text-base mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    {
                        section.map((item, index) => <Tabs.Tab key={index} value={item.toLowerCase()} >
                            {item}
                        </Tabs.Tab>)
                    }

                </Tabs.List>
                <Tabs.Panel value="about">
                    <AboutComp/>
                </Tabs.Panel>

                <Tabs.Panel value="jobs">
                    <CompanyJobs/>
                </Tabs.Panel>

                <Tabs.Panel value="employees">
                    <CompanyEmployees/>
                </Tabs.Panel>
            </Tabs>
        </div>
    </div>
}
export default Company;