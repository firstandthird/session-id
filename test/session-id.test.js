import test from 'tape-rollup';
import CookieMonster from '@firstandthird/cookie-monster';
import sessionId from '../lib/session-id';


function teardown() {
  CookieMonster.remove('session');
  CookieMonster.remove('test');
}

test('create', assert => {
  assert.equal(CookieMonster.get('session'), null, 'session didn\'t exist before calling');
  sessionId();
  const session = CookieMonster.get('session');
  assert.notEqual(session, null, 'session should exist after calling');
  assert.end();
  teardown();
});

test('content', assert => {
  sessionId();
  let session = CookieMonster.get('session');
  assert.equal(typeof session.timestamp, 'number', 'should have a timestamp');
  assert.equal(typeof session.id, 'string', 'should have a string');
  const id1 = session.id;
  teardown();
  sessionId();
  session = CookieMonster.get('session');
  const id2 = session.id;
  assert.notEqual(id1, id2, 'ids should be unique');
  assert.end();
  teardown();
});

test('custom storage', assert => {
  sessionId(undefined, 'test');
  assert.equal(CookieMonster.get('session'), null, 'session doesn\'t exist on default storage');
  assert.notEqual(CookieMonster.get('test'), null, 'session exists on custom storage');
  assert.end();
  teardown();
});

test('custom id', assert => {
  sessionId('my-custom-id');
  const session = CookieMonster.get('session');
  assert.equal(session.id, 'my-custom-id', 'should be possible to pass a custom id');
  assert.end();
  teardown();
});
