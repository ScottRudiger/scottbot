const handleHideHelp = ({post, responseUrl, handleSlackErr}) => () => post({
  baseUrl: '',
  url: responseUrl,
  body: {delete_original: true},
}).catch(handleSlackErr);

export default handleHideHelp;
