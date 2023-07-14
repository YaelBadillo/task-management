import { httpException } from './http-exception'

describe('httpException', () => {
  it('should work', () => {
    expect(httpException()).toEqual('http-exception')
  })
})
