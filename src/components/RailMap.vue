<template>
  <div class="container">
    <div class="svg-container"></div>
    <div class="info-container">{{ info }}</div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import utils from '@/utils'
export default {
  data() {
    return {
      svg: null,
      width: 800,
      height: 600,
      VIEWBOX: ``,
      innerRadius: 30,
      outerRadius: 70,
      zoomed: false,
      info: '',
      nodes: [
        {
          id: 0,
          title: '1',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 60,
              text: '1'
            },
            {
              id: 1,
              angle: 150,
              text: '2'
            },
            {
              id: 2,
              angle: 230,
              text: '3'
            },
            {
              id: 3,
              angle: 310,
              text: '4'
            }
          ],
          position: {
            x: 80,
            y: 85
          }
        },
        {
          id: 1,
          title: '2',
          content: '',
          childrens: [],
          position: {
            x: 30,
            y: 80
          }
        },

        {
          id: 2,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 10,
            y: 40
          }
        },
        {
          id: 3,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 40,
            y: 15
          }
        },
        {
          id: 4,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 60,
            y: 50
          }
        },
        {
          id: 5,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 90,
            y: 20
          }
        }
      ],
      questions: [
        {
          title: '«Города»',
          questions: [
            {
              title:
                'Этот город расположен на побережье самого теплого моря России, его порт занимает' +
                'первое место в стране по грузоперевозкам и является крупнейшим производителем цемента.',
              answers: [
                {
                  title: 'Новороссийск',
                  correct: true
                },
                {
                  title: 'Туапсе',
                  correct: false
                },
                {
                  title: 'Сочи',
                  correct: false
                },
                {
                  title: 'Феодосия',
                  correct: false
                }
              ],
              img: '0_0.jpg'
            },
            {
              title:
                'Этот город расположен на побережье незамерзающего моря России, является ' +
                'самым северным незамерзающим портом. В городе можно увидеть полярный день и полярную ночь.',
              answers: [
                {
                  title: 'Мурманск',
                  correct: true
                },
                {
                  title: 'Архангельск',
                  correct: false
                },
                {
                  title: 'Тикси',
                  correct: false
                },
                {
                  title: 'Диксон',
                  correct: false
                }
              ],
              img: '0_1.jpg'
            },
            {
              title:
                'Фашисты бросили на взятие этого города свои отборные войска: три танковых дивизии,' +
                'одну моторизованную и полк «Великая Германия», но  город выстоял! Враг не смог его захватить. ' +
                'Город известен как оружейная кузница России, пряниками и чугуном.',
              answers: [
                {
                  title: 'Тула',
                  correct: true
                },
                {
                  title: 'Рязань',
                  correct: false
                },
                {
                  title: 'Тверь',
                  correct: false
                },
                {
                  title: 'Ярославль',
                  correct: false
                }
              ],
              img: '0_3.jpg'
            },
            {
              title:
                'Крупнейший порт Черного моря и главная военно-морская база страны. Его героическая' +
                ' защита от немецко-фашисткой агрессии началась 30 октября 1941г. и продолжалась' +
                ' 250 дней, войдя в историю, как образец активной, длительной обороны приморского' +
                ' города в глубоком тылу врага. Символ города- гордый памятник «Затопленным кораблям»' +
                ' – память и дань трагическим событиям 1853 г. – 1854 г. Ради спасения города адмирал' +
                ' Нахимов приказал затопить свои корабли, не дав судам врага закрепиться на рейде.',
              answers: [
                {
                  title: 'Севастополь',
                  correct: true
                },
                {
                  title: 'Одесса',
                  correct: false
                },
                {
                  title: 'Симферополь',
                  correct: false
                },
                {
                  title: 'Ялта',
                  correct: false
                }
              ],
              img: '0_4.jpg'
            }
          ],
          completed: false
        },
        {
          title: '',
          questions: [
            {
              title: '',
              answers: [
                {
                  title: '',
                  correct: true
                },
                {
                  title: '',
                  correct: false
                },
                {
                  title: '',
                  correct: false
                },
                {
                  title: '',
                  correct: false
                }
              ],
              img: '0_0.jpg'
            },
            {
              title: '',
              answers: [
                {
                  title: 'Мурманск',
                  correct: true
                },
                {
                  title: 'Архангельск',
                  correct: false
                },
                {
                  title: 'Тикси',
                  correct: false
                },
                {
                  title: 'Диксон',
                  correct: false
                }
              ],
              img: '0_1.jpg'
            },
            {
              title:
                'Фашисты бросили на взятие этого города свои отборные войска: три танковых дивизии,' +
                'одну моторизованную и полк «Великая Германия», но  город выстоял! Враг не смог его захватить. ' +
                'Город известен как оружейная кузница России, пряниками и чугуном.',
              answers: [
                {
                  title: 'Тула',
                  correct: true
                },
                {
                  title: 'Рязань',
                  correct: false
                },
                {
                  title: 'Тверь',
                  correct: false
                },
                {
                  title: 'Ярославль',
                  correct: false
                }
              ],
              img: '0_3.jpg'
            },
            {
              title:
                'Крупнейший порт Черного моря и главная военно-морская база страны. Его героическая' +
                ' защита от немецко-фашисткой агрессии началась 30 октября 1941г. и продолжалась' +
                ' 250 дней, войдя в историю, как образец активной, длительной обороны приморского' +
                ' города в глубоком тылу врага. Символ города- гордый памятник «Затопленным кораблям»' +
                ' – память и дань трагическим событиям 1853 г. – 1854 г. Ради спасения города адмирал' +
                ' Нахимов приказал затопить свои корабли, не дав судам врага закрепиться на рейде.',
              answers: [
                {
                  title: 'Севастополь',
                  correct: true
                },
                {
                  title: 'Одесса',
                  correct: false
                },
                {
                  title: 'Симферополь',
                  correct: false
                },
                {
                  title: 'Ялта',
                  correct: false
                }
              ],
              img: '0_4.jpg'
            }
          ],
          completed: false
        }
      ]
    }
  },
  mounted() {
    this.VIEWBOX = `0 0 ${this.width} ${this.height}`
    this.drawMap()
  },
  watch: {
    zoomed: function (val, oldVal) {
      if (val !== oldVal) {
        this.info = `viewBox: ${this.svg.attr('viewBox')}`
      }
    }
  },
  methods: {
    drawMap() {
      this.svg = d3
        .select('.svg-container')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('viewBox', this.VIEWBOX)
      let road = []
      for (const node of this.nodes) {
        let x = utils.translateCoords(node.position.x, this.width)
        let y = utils.translateCoords(node.position.y, this.height)
        for (const child of node.childrens) {
          this.drawChild(child, x, y, node.id)
        }
        let g = this.svg.append('g').attr('class', 'station').attr('id', node.id)
        g.append('circle').attr('r', this.innerRadius).attr('cx', x).attr('cy', y)
        g = this.svg.append('g').attr('class', 'station-border').attr('id', `out_${node.id}`)
        // outer circle
        // g.append('circle').attr('r', this.outerRadius).attr('cx', x).attr('cy', y)

        // set road coords
        road.push({ x: x, y: y })
      }

      for (let i = 0; i < road.length - 1; i++) {
        let angle = utils.getAngle([road[i].x, road[i].y, road[i + 1].x, road[i + 1].y])
        let g = this.svg
          .append('g')
          .attr('class', 'road')
          .attr('id', `${this.nodes[i].id}_${this.nodes[i + 1].id}`)
        g.append('line')
          .attr('x1', road[i].x + utils.getX(this.innerRadius + 2, road[i].x, road[i + 1].x, angle))
          .attr('y1', road[i].y + utils.getY(this.innerRadius + 2, road[i].y, road[i + 1].y, angle))
          .attr('x2', road[i + 1].x + utils.getX(this.innerRadius + 2, road[i + 1].x, road[i].x, angle))
          .attr('y2', road[i + 1].y + utils.getY(this.innerRadius + 2, road[i + 1].y, road[i].y, angle))

        console.log(utils.getAngle([road[i].x, road[i].y, road[i + 1].x, road[i + 1].y]))
      }

      let that = this
      d3.selectAll('.station').on('click', function () {
        let viewbox = that.VIEWBOX.split(' ')
        let bbox = this.getBBox()
        let vb = [bbox.x - bbox.width / 1.1, bbox.y - bbox.height / 1.3, viewbox[2] / 5, viewbox[3] / 4].join(' ')
        let svg = d3.select('svg')
        let node = that.nodes.filter((i) => i.id == d3.select(this).attr('id'))

        console.log(node[0])
        if (!that.zoomed) {
          svg
            .transition()
            .duration(1000)
            .attr('viewBox', vb)
            .on('end', () => {
              that.showChild(node[0], 0, 500)
              that.showChild(node[0], 1, 700)
              that.showChild(node[0], 2, 900)
              that.showChild(node[0], 3, 1100)
              that.zoomed = true
            })
        } else {
          svg
            .transition()
            .duration(500)
            .attr('viewBox', that.VIEWBOX)
            .on('end', () => {
              that.hideChild(node[0], 3, 200)
              that.hideChild(node[0], 2, 400)
              that.hideChild(node[0], 1, 600)
              that.hideChild(node[0], 0, 800)
              that.zoomed = false
            })
        }
      })
    },
    drawChild(child, x, y, id) {
      let subG = this.svg.append('g').attr('class', 'sub-station').attr('id', `child-${id}_${child.id}`)
      let childX =
        x +
        utils.getX(
          this.outerRadius,
          x,
          this.outerRadius * Math.cos(utils.toRadians(child.angle)),
          utils.toRadians(child.angle)
        )
      let childY =
        y +
        utils.getY(
          this.outerRadius,
          y,
          this.outerRadius * Math.sin(utils.toRadians(child.angle)),
          utils.toRadians(child.angle)
        )
      subG
        .append('circle')
        .attr('r', this.innerRadius / 3)
        .attr('cx', childX)
        .attr('cy', childY)
        .attr('class', 'sub-station__circle')
      subG
        .append('text')
        .text(child.text)
        .attr('x', childX)
        .attr('y', childY)
        .attr('text-anchor', 'middle')
        .attr('class', 'sub-station__text')
      let angle = utils.getAngle([x, y, childX, childY])
      console.log('child angle', angle, x, y, childX, childY)
      subG
        .append('line')
        .attr('x1', x + utils.getX(this.innerRadius + 1, x, childX, angle))
        .attr('y1', y + utils.getY(this.innerRadius + 1, y, childY, angle))
        .attr('x2', childX + utils.getX(this.innerRadius / 3 + 1, childX, x, angle))
        .attr('y2', childY + utils.getY(this.innerRadius / 3 + 1, childY, y, angle))
        .attr('class', 'sub-station__line')
        .style('opacity', 0)
      let dx = x - childX
      let dy = y - childY
      subG.attr('transform', `matrix(1, 0, 0, 1, ${dx}, ${dy})`)
    },
    showChild(node, id, duration) {
      d3.select(`#child-${node.id}_${id}`).transition().duration(duration).attr('transform', `matrix(1, 0, 0, 1, 0, 0)`)
      d3.select(`#child-${node.id}_${id}`)
        .select('.sub-station__line')
        .transition()
        .duration(duration)
        .style('opacity', 1)
    },
    hideChild(node, id, duration) {
      let cx = d3.select(`#child-${node.id}_${id}`).select('.sub-station__circle').attr('cx')
      let cy = d3.select(`#child-${node.id}_${id}`).select('.sub-station__circle').attr('cy')
      let x = utils.translateCoords(node.position.x, this.width)
      let y = utils.translateCoords(node.position.y, this.height)
      let dx = x - cx
      let dy = y - cy
      d3.select(`#child-${node.id}_${id}`)
        .transition()
        .duration(duration)
        .attr('transform', `matrix(1, 0, 0, 1, ${dx}, ${dy})`)
      d3.select(`#child-${node.id}_${id}`)
        .select('.sub-station__line')
        .transition()
        .duration(duration)
        .style('opacity', 0)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>