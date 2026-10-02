// Navigation links shown to each account type. Pages outside this list are
// still guarded by ProtectedRoute; this only keeps them out of the menus.
const linksByAccountType = {
  APPLICANT: [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Job History", url: "/job-history" },
  ],
  EMPLOYER: [
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0" },
    { name: "Posted Jobs", url: "/posted-jobs/0" },
  ],
};
linksByAccountType.ADMIN = [
  ...linksByAccountType.APPLICANT,
  ...linksByAccountType.EMPLOYER,
];

export const getNavLinks = (accountType) =>
  linksByAccountType[accountType] || [];

// Where each account type lands after logging in
export const getHomeRoute = (accountType) =>
  accountType === "EMPLOYER" ? "/find-talent" : "/find-jobs";

// Matches nested pages too, e.g. /posted-jobs/12 for the Posted Jobs link
export const isActiveLink = (pathname, url) => {
  const base = url.replace(/\/0$/, "");
  return pathname === base || pathname.startsWith(base + "/");
};
