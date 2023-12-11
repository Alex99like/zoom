export const generateMeetingId = () => {
  let meetingID = "";
  const chars = "12345quertyuiopasdfgh67890klanbvexzNEVCZXASOQHERTYHGFUTOLKIP";
  const maxPos = chars.length;

  for (let i = 0; i < 8; i++) {
    meetingID += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return meetingID;
};
