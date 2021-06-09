const items=[
    {id:1,name:'j'}
],

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: 'Hello World',
  }
}
