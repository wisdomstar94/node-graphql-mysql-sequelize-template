const errorHandler = function(err, req, res, next) {
  const err_status = err.status || 500;

  if (err_status !== 404) {
    console.error(err.stack);
    console.error(JSON.stringify(err));
  }
  console.error('message : ' + err.message);
  console.error('status : ' + err_status);

  res.status(err_status);
  try {
    const json_object = JSON.parse(err.message);
    res.json(json_object);
    return;
  } catch (e) {
    res.send('에러가 발생하였습니다.');
    return;
  }
};

module.exports = errorHandler;