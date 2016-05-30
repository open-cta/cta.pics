import URI from 'uri'

export function follow(ctx, connection){
    let qs = URI.parseQuery(ctx.querystring);
    let params = {
        'type': 'follow',
        'payload': {
            'rn': qs['rn'],
            'prdt': qs['ts']
        }
    }
    connection.send(JSON.stringify(params))
}
  
export function iterate(ctx, connection){
    if (ctx.params[0]) {
        let params = {
            'type': 'iterate',
            'payload': {
                'timestamp': ctx.params[0]
            }
        }
        connection.send(JSON.stringify(params));
    } else {
        let params = {'type': 'random'}
        connection.send(JSON.stringify(params));
    }
};