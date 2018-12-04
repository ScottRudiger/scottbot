const handlePlayAgain = dependencies => async () => {
  const {
    get,
    post,
    storage,
    userId,
    channel,
    username,
    handleStorageErr,
    handleSlackErr,
  } = dependencies;
  const {user: {profile: {image_24: profilePic}}} = JSON.parse(
    await get(`https://slack.com/api/users.info?user=${userId}`).catch(handleSlackErr),
  );
  storage.get((err, {botname}) => {
    if (err) return handleStorageErr(err, handlePlayAgain(dependencies));
    post({
      uri: 'chat.postMessage',
      body: {
        channel,
        text: `@${botname} play guess-the-combo`,
        link_names: 1,
        username,
        icon_url: profilePic,
      },
    }).catch(handleSlackErr);
  });
};

export default handlePlayAgain;
