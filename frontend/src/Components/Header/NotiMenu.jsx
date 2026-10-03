import { ActionIcon, Indicator, Menu } from "@mantine/core";
import { IconBell, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotifications, readNotification } from "../../Services/NotiService";
import { timeAgo } from "../../Services/Utilities";

const NotiMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [opened, setOpened] = useState(false);

  const load = useCallback(() => {
    getNotifications(user.id)
      .then((res) => setNotifications(res))
      .catch((err) => console.log(err));
  }, [user.id]);

  // Load on login and refresh every minute
  useEffect(() => {
    load();
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, [load]);

  const markRead = (noti) => {
    setNotifications((list) => list.filter((n) => n.id !== noti.id));
    readNotification(noti.id).catch((err) => console.log(err));
  };

  const openNotification = (noti) => {
    markRead(noti);
    setOpened(false);
    if (noti.route) navigate(noti.route);
  };

  return (
    <Menu shadow="md" width={340} opened={opened} onChange={(o) => { setOpened(o); if (o) load(); }} position="bottom-end">
      <Menu.Target>
        <Indicator disabled={notifications.length === 0} color="red" offset={6} size={8}>
          <ActionIcon variant="subtle" color="dark" size="lg" aria-label="Notifications">
            <IconBell stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Notifications</Menu.Label>
        {notifications.length === 0 && (
          <div className="px-3 py-4 text-sm text-mine-shaft-300">You're all caught up.</div>
        )}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((noti) => (
            <div key={noti.id} className="flex gap-2 items-start px-3 py-2 rounded-md hover:bg-mine-shaft-900">
              <button className="flex-1 text-left" onClick={() => openNotification(noti)}>
                <div className="text-sm font-semibold text-mine-shaft-50">{noti.action}</div>
                <div className="text-sm text-mine-shaft-300">{noti.message}</div>
                <div className="text-xs text-mine-shaft-400 mt-1">{timeAgo(noti.timestamp)}</div>
              </button>
              <ActionIcon variant="subtle" color="gray" size="sm" aria-label="Dismiss" onClick={() => markRead(noti)}>
                <IconX size={14} />
              </ActionIcon>
            </div>
          ))}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotiMenu;
