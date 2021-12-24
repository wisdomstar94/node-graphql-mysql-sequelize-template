// 여기서 반환되는 값은 resolvers 의 Mutation 안에 정의된 함수의 context 인자에서 받을 수 있다.
module.exports = async({ req }) => {
  /*
    req 값을 참조하여 이곳에서 auth 체크가 가능하다
    req.headers...
  */
  // console.log('req', req);
  return {  };
};
