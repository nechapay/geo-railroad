<template>
  <div class="svg-container"></div>
</template>

<script>
import * as d3 from 'd3'
import utils from '@/utils'
export default {
  data() {
    return {
      mapp: 'hello',
      svg: null,
      width: 800,
      height: 600,
      VIEWBOX: ``,
      innerRadius: 30,
      outerRadius: 70,
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
            x: 10,
            y: 40
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

      for (const node of this.nodes) {
        let g = this.svg.append('g').attr('class', 'station').attr('id', node.id)
        g.append('circle')
          .attr('r', this.innerRadius)
          .attr('cx', utils.translateCoords(node.position.x, this.width))
          .attr('cy', utils.translateCoords(node.position.y, this.height))
        g = this.svg.append('g').attr('class', 'station-border').attr('id', `out_${node.id}`)

        g.append('circle')
          .attr('r', this.outerRadius)
          .attr('cx', utils.translateCoords(node.position.x, this.width))
          .attr('cy', utils.translateCoords(node.position.y, this.height))
      }

      d3.selectAll('.station')
        .on('mouseover', function () {
          d3.select(this).select('circle').transition().attr('r', 50)
          console.log('mouseover', this)
        })
        .on('mouseout', function () {
          d3.select(this).select('circle').transition().attr('r', 30)
          console.log('mouseout', this)
        })
    }
  }
}
</script>

<style>
.svg-container {
  border: 1px solid black;
}
.station {
  fill: red;
  stroke: black;
  stroke-width: 1;
  transition-duration: 0.5s;
}
.station-border {
  stroke-opacity: 0.3;
  fill: none;
  stroke: grey;
}
</style>