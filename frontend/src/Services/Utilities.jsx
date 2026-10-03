const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short" };
  return date.toLocaleString("en-US", options);
};

// Server-generated times are UTC without a zone suffix
const parseServerTime = (timestamp) =>
  typeof timestamp === "string" && !/[zZ]|[+-]\d\d:\d\d$/.test(timestamp)
    ? new Date(timestamp + "Z")
    : new Date(timestamp);

// Dates picked by users are sent as local wall-clock time, so they read back unchanged
const toLocalDateTime = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

function timeAgo(timestamp) {
  if (!timestamp) return "";
  const now = new Date();
  const postDate = parseServerTime(timestamp);
  const diffInMs = Math.max(0, now.getTime() - postDate.getTime());

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  } else {
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }
}

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const pdfBlobUrl = (base64) => {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
};

// Opens a base64 PDF in a new tab
const openPDF = (base64) => {
  const newWindow = window.open(pdfBlobUrl(base64), "_blank");
  if (!newWindow) alert("Your browser blocked the new tab. Please allow pop-ups for this site, or use Download.");
};

const downloadPDF = (base64, fileName) => {
  const link = document.createElement("a");
  link.href = pdfBlobUrl(base64);
  link.download = fileName;
  link.click();
};

const formatInterviewTime = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

// Shows a generic icon when a company has no logo in /public/Icons
const logoFallback = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = "/Icons/default.svg";
};

const formatExperience = (years) => {
  const n = Number(years) || 0;
  return n === 0 ? "Fresher" : `${n} year${n === 1 ? "" : "s"}`;
};

export { formatDate, timeAgo, getBase64, openPDF, downloadPDF, formatInterviewTime, logoFallback, toLocalDateTime, formatExperience };
