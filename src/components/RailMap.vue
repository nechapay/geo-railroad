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
          id: 1,
          title: '1',
          content: '',
          childrens: [],
          position: {
            x: 80,
            y: 85
          }
        },
        {
          id: 2,
          title: '2',
          content: '',
          childrens: [],
          position: {
            x: 30,
            y: 80
          }
        },

        {
          id: 3,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 10,
            y: 40
          }
        },
        {
          id: 4,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 40,
            y: 15
          }
        },
        {
          id: 5,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 60,
            y: 50
          }
        },
        {
          id: 6,
          title: '',
          content: '',
          childrens: [],
          position: {
            x: 90,
            y: 20
          }
        }
      ]
    }
  },
  mounted() {
    this.VIEWBOX = `0 0 ${this.width} ${this.height}`
    this.drawMap()
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
        let g = this.svg.append('g').attr('class', 'station').attr('id', node.id)
        let x = utils.translateCoords(node.position.x, this.width)
        let y = utils.translateCoords(node.position.y, this.height)
        g.append('circle').attr('r', this.innerRadius).attr('cx', x).attr('cy', y)
        g = this.svg.append('g').attr('class', 'station-border').attr('id', `out_${node.id}`)
        // outer circle
        g.append('circle').attr('r', this.outerRadius).attr('cx', x).attr('cy', y)

        // set road coords
        road.push({ x: x, y: y })
      }

      console.log(road)

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
        if (!that.zoomed) {
          svg.transition().duration(1000).attr('viewBox', vb)
          that.zoomed = true
        } else {
          svg.transition().duration(500).attr('viewBox', that.VIEWBOX)
          that.zoomed = false
        }
        setTimeout(function () {
          that.info = `viewBox: ${that.svg.attr('viewBox')}`
        }, 1000)
      })
      // d3.selectAll('.station')
      //   .on('mouseover', function () {
      //     d3.select(this).select('circle').transition().attr('r', 50)
      //     console.log('mouseover', this)
      //   })
      //   .on('mouseout', function () {
      //     d3.select(this).select('circle').transition().attr('r', 30)
      //     console.log('mouseout', this)
      //   })
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