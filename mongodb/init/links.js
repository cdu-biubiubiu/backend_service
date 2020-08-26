db.links.deleteMany({});

let links = [
  {
    name: 'Baidu',
    src: 'www.baidu.com',
  },
  {
    name: 'Tencent',
    src: 'www.qq.com',
  },
  {
    name: 'Zhihu',
    src: 'www.zhihu.com',
  },
  {
    name: 'netflex',
    src: 'www.netflex.com',
  },
];

for (let i = 0; i < 3; i += 1) {
  db.links.insertMany(links);
}
