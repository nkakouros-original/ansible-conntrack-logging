function process(event) {
  var m = event.Get("message");

  m = m.replace('\t', ' ').split(' ').filter(function (s) {return s != ''}).map(function (s) {return s.split('=')});

  var i = 0;
  var c = [];

  var timestamp = m[i][0].substring(1, m[i][0].length-1)
  timestamp = timestamp*1000
  c[i] = ["timestamp", timestamp.toString()]
  i++;

  c[i] = ['event', m[i][0].substring(1, m[i][0].length-1)];
  i++;
  c[i] = ['net_proto', m[i++][0]];
  c[i] = ['net_proto_num', m[i++][0]];
  c[i] = ['trans_proto', m[i++][0]];
  c[i] = ['trans_proto_num', m[i++][0]];

  if (!isNaN(m[i+1][0])) {
    c[i] = ['timeout', m[i++][0]];
  }


  for (var j = i; j < m.length; j++) {
    if (m[j][0] == '[start' || m[j][0] == '[stop') {
      c[i++] = [m[j][0] == '[start' ? 'start_time' : 'end_time', m[j][1] + ' ' + m.slice(j+1, j+5).join(' ').slice(0, -1)];
      j = j+4;
      continue;
    }
    c[i++] = [m[j][0], m[j][1]];
  }

  // rewrite keys that appear more than once
  var d = 0;
  var s = 0;
  var id = -1;
  for (var i=0; i<c.length; i++) {
    if (c[i][0] == 'src') c[i][0] = 'src' + ++s;
    if (c[i][0] == 'dst') c[i][0] = 'dst' + ++d;
    if (c[i][0] == 'sport') c[i][0] = 'sport' + s;
    if (c[i][0] == 'dport') c[i][0] = 'dport' + d;
    if (c[i][0] == 'type') c[i][0] = 'type' + d;
    if (c[i][0] == 'code') c[i][0] = 'code' + d;
    if (typeof c[i][1] == 'undefined') {
      c[i] = ['state', m[i][0].substring(1, m[i][0].length-1)];
    }
    if (c[i][0] == 'delta-time') c[i][0] = 'delta_time';
  }
  c[c.length-1] = ['conntrack_id', c[c.length-1][1]];

  var conntrack = {};
  for (var i=0; i < c.length; i++) {
    conntrack[c[i][0]] = c[i][1];
  }

  event.Put('conntrack', conntrack);
}
