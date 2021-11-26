<template>
  <div class="container">
    <div class="svg-container"></div>
    <div class="info-container">Счёт: {{ score }}</div>
    <transition name="fade">
      <Dialog :question="currentQuestion" :head="currentCat" v-show="dialog" @close="handleCloseDialog" />
    </transition>
  </div>
</template>

<script>
import * as d3 from 'd3'
import utils from '@/utils'
import Dialog from '@/components/Dialog.vue'
import _ from 'lodash'

export default {
  components: { Dialog },
  data() {
    return {
      svg: null,
      // width: 800,
      // height: 600,
      VIEWBOX: ``,
      innerRadius: 30,
      outerRadius: 70,
      zoomed: false,
      info: '',
      dialog: false,
      qIdx: 0,
      sQIdx: 0,
      currentQuestion: {},
      currentCat: '',
      currentId: 0,
      score: 0,
      nodes: [
        {
          id: 0,
          title: '1',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 60,
              text: '1',
              show: true
            },
            {
              id: 1,
              angle: 150,
              text: '2',
              show: true
            },
            {
              id: 2,
              angle: 230,
              text: '3',
              show: true
            },
            {
              id: 3,
              angle: 310,
              text: '4',
              show: true
            }
          ],
          position: {
            x: 65,
            y: 85
          }
        },
        {
          id: 1,
          title: '2',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 60,
              text: '1',
              show: true
            },
            {
              id: 1,
              angle: 150,
              text: '2',
              show: true
            },
            {
              id: 2,
              angle: 230,
              text: '3',
              show: true
            },
            {
              id: 3,
              angle: 310,
              text: '4',
              show: true
            }
          ],
          position: {
            x: 30,
            y: 80
          }
        },
        {
          id: 2,
          title: '3',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 60,
              text: '1',
              show: true
            },
            {
              id: 1,
              angle: 150,
              text: '2',
              show: true
            },
            {
              id: 2,
              angle: 200,
              text: '3',
              show: true
            },
            {
              id: 3,
              angle: 310,
              text: '4',
              show: true
            }
          ],
          position: {
            x: 10,
            y: 40
          }
        },
        {
          id: 3,
          title: '4',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 45,
              text: '1',
              show: true
            },
            {
              id: 1,
              angle: 150,
              text: '2',
              show: true
            },
            {
              id: 2,
              angle: 230,
              text: '3',
              show: true
            },
            {
              id: 3,
              angle: 310,
              text: '4',
              show: true
            }
          ],
          position: {
            x: 40,
            y: 15
          }
        },
        {
          id: 4,
          title: '5',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 25,
              text: '1',
              show: true
            },
            {
              id: 1,
              angle: 150,
              text: '2',
              show: true
            },
            {
              id: 2,
              angle: 230,
              text: '3',
              show: true
            },
            {
              id: 3,
              angle: 310,
              text: '4',
              show: true
            }
          ],
          position: {
            x: 45,
            y: 50
          }
        },
        {
          id: 5,
          title: '6',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 60,
              text: '1',
              show: true
            },
            {
              id: 1,
              angle: 150,
              text: '2',
              show: true
            },
            {
              id: 2,
              angle: 230,
              text: '3',
              show: true
            },
            {
              id: 3,
              angle: 350,
              text: '4',
              show: true
            }
          ],
          position: {
            x: 75,
            y: 20
          }
        },
        {
          id: 6,
          title: '7',
          content: '',
          childrens: [
            {
              id: 0,
              angle: 35,
              text: '1',
              show: true
            },
            {
              id: 1,
              angle: 150,
              text: '2',
              show: true
            },
            {
              id: 2,
              angle: 230,
              text: '3',
              show: true
            },
            {
              id: 3,
              angle: 350,
              text: '4',
              show: true
            }
          ],
          position: {
            x: 85,
            y: 50
          }
        }
      ],
      questions: [
        // 0
        {
          title: '«Города»',
          questions: [
            // 0 - 0
            {
              title:
                'Этот город расположен на побережье самого теплого моря России, его порт занимает первое место в стране по грузоперевозкам и является крупнейшим производителем цемента.',
              type: 'single',
              answers: [
                [
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
                ]
              ],
              img: '0_0.jpg'
            },
            // 0 - 1
            {
              title:
                'Этот город расположен на побережье незамерзающего моря России, является ' +
                'самым северным незамерзающим портом. В городе можно увидеть полярный день и полярную ночь.',
              type: 'single',
              answers: [
                [
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
                ]
              ],
              img: '0_1.jpg'
            },
            // 0 - 2
            {
              title:
                'Фашисты бросили на взятие этого города свои отборные войска: три танковых дивизии,' +
                'одну моторизованную и полк «Великая Германия», но  город выстоял! Враг не смог его захватить. ' +
                'Город известен как оружейная кузница России, пряниками и чугуном.',
              type: 'single',
              answers: [
                [
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
                ]
              ],
              img: '0_2.jpg'
            },
            // 0 - 3
            {
              title:
                'Крупнейший порт Черного моря и главная военно-морская база страны. Его героическая' +
                ' защита от немецко-фашисткой агрессии началась 30 октября 1941г. и продолжалась' +
                ' 250 дней, войдя в историю, как образец активной, длительной обороны приморского' +
                ' города в глубоком тылу врага. Символ города- гордый памятник «Затопленным кораблям»' +
                ' – память и дань трагическим событиям 1853 г. – 1854 г. Ради спасения города адмирал' +
                ' Нахимов приказал затопить свои корабли, не дав судам врага закрепиться на рейде.',
              type: 'single',
              answers: [
                [
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
                ]
              ],
              img: '0_3.jpg'
            }
          ],
          final: {
            title: `
            <div class="final-wrapper">
              <div class="final-text">Что объединяет эти города?</div>
              <div class="final-images">
                <div class="image-wrapper"><img src="./img/0_0.jpg"></div>
                <div class="image-wrapper"><img src="./img/0_1.jpg"></div>
                <div class="image-wrapper"><img src="./img/0_2.jpg"></div>
                <div class="image-wrapper"><img src="./img/0_3.jpg"></div>
              </div>
            </div>`,
            type: 'single',
            answers: [
              [
                {
                  title: 'города герои Великой Отечественной войны',
                  correct: true
                },
                {
                  title: 'города Воинской Славы',
                  correct: false
                },
                {
                  title: 'города миллионеры',
                  correct: false
                },
                {
                  title: 'города-побратимы',
                  correct: false
                }
              ]
            ],
            imgs: ['0_0.jpg', '0_1.jpg', '0_2.jpg', '0_3.jpg']
          },
          completed: false
        },
        // 1
        {
          title: 'Атмосферное явление',
          questions: [
            // 1 - 0
            {
              title:
                'Характерной особенностью погодных условий морских побережий и побережий крупных озёр являются ветры, меняющие два раза в сутки своё направление. В период Великой Отечественной войны, наши матросы, находясь на рейде в акватории  Охотского моря, вынуждены были ходить в противогазах, спасаясь от газовых атак  противника. Как называется ветер и в какое время суток, матросы могли находиться на корабле без противогаза?',
              type: 'multi',
              answers: [
                [
                  {
                    title: 'бриз',
                    correct: true
                  },
                  {
                    title: 'муссон',
                    correct: false
                  },
                  {
                    title: 'пассат',
                    correct: false
                  }
                ],
                [
                  {
                    title: 'ночь',
                    correct: false
                  },
                  {
                    title: 'день',
                    correct: true
                  }
                ]
              ]
            },
            // 1 - 1
            {
              title:
                'В 1848 году  этот ветер перешел в сильнейший ураган. К ветру добавился мороз, доходивший до минус 5 градусов по Цельсию. Стоявшая на рейде эскадра в составе пяти кораблей  получили большие повреждения. Ураганом был выброшен на берег  и разбит бриг "Паломед". Корабль "Струя" под тяжестью намерзшего на него льда утонул вместе со всем экипажем. Капитаны кораблей , зная о географических особенностях данной бухты, стремились не задерживаться в ней на рейде  и быстрее уйти в открытое море. Как называется  местный ветер в этой бухте?',
              type: 'single',
              answers: [
                [
                  {
                    title: 'бора',
                    correct: true
                  },
                  {
                    title: 'фён',
                    correct: false
                  },
                  {
                    title: 'ураган',
                    correct: false
                  },
                  {
                    title: 'сарма',
                    correct: false
                  },
                  {
                    title: 'баргузин',
                    correct: false
                  }
                ]
              ]
            },
            // 1 - 2
            {
              title:
                'Какие физико-географические особенности побережья Дальнего Востока обусловили выбор  военным  командованием место  дислокации войск в летний период,  на подветренном склоне хребта Сихотэ-Алинь.',
              type: 'multi',
              answers: [
                [
                  {
                    title: 'муссон',
                    correct: true
                  },
                  {
                    title: 'бриз',
                    correct: false
                  },
                  {
                    title: 'пассат',
                    correct: false
                  },
                  {
                    title: 'култук',
                    correct: false
                  }
                ],
                [
                  {
                    title: 'наводнения',
                    correct: true
                  },
                  {
                    title: 'штормы',
                    correct: false
                  },
                  {
                    title: 'пожары',
                    correct: false
                  },
                  {
                    title: 'оползни',
                    correct: false
                  }
                ]
              ]
            },
            // 1 - 3
            {
              title:
                'Летом 1942 года фашисты начали наступление на город Астрахань. Учитывая неблагоприятный географический аспект данной местности, наши войска, обманным маневром вывели врага в открытую местность и это природной явление остановило вражеское наступление.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Суховей',
                    correct: true
                  },
                  {
                    title: 'Мираж',
                    correct: false
                  },
                  {
                    title: 'Гала',
                    correct: false
                  },
                  {
                    title: 'Ливень',
                    correct: false
                  }
                ]
              ]
            }
          ],
          final: {
            title: `
            <div class="final-wrapper">
              <div class="final-text">Какое атмосферное явление объединяет все эти задания?</div>
              <div class="final-images">
                <div class="image-wrapper"></div>
                <div class="image-wrapper"></div>
                <div class="image-wrapper"></div>
                <div class="image-wrapper"></div>
              </div>
            </div>`,
            type: 'single',
            answers: [
              [
                {
                  title: 'ветер',
                  correct: true
                },
                {
                  title: 'шторм',
                  correct: false
                },
                {
                  title: 'цунами',
                  correct: false
                },
                {
                  title: 'смерч',
                  correct: false
                }
              ]
            ]
          },
          completed: false
        },
        // 2
        {
          title: 'Ориентирование',
          questions: [
            // 2 - 0
            {
              title: `<div class="dialog__content--wrapper"><div class="dialog__content--wrapper-img"><img src="img\\2_0.jpg"></div>
              <div class="dialog__content--wrapper-text">Выберите участок, где можно было  бы разместить склад с боеприпасами, учитывая безопасность и недоступность для противника.</div></div>
                `,
              type: 'single',
              answers: [
                [
                  {
                    title: '№ 3',
                    correct: true
                  },
                  {
                    title: '№ 2',
                    correct: false
                  },
                  {
                    title: '№ 1',
                    correct: false
                  }
                ]
              ],
              img: '2_0.jpg'
            },
            // 2 - 1
            {
              title: `<div class="dialog__content--wrapper"><div class="dialog__content--wrapper-img"><img src="img\\2_0.jpg"></div>
              <div class="dialog__content--wrapper-text">Определите азимут от колодца до точки Б</div></div>`,
              type: 'single',
              answers: [
                [
                  {
                    title: '190°',
                    correct: true
                  },
                  {
                    title: '100°',
                    correct: false
                  },
                  {
                    title: '220°',
                    correct: false
                  },
                  {
                    title: '320°',
                    correct: false
                  }
                ]
              ],
              img: '2_0.jpg'
            },
            // 2 - 2
            {
              title: `<div class="dialog__content--wrapper"><div class="dialog__content--wrapper-img"><img src="img\\2_0.jpg"></div>
              <div class="dialog__content--wrapper-text">Определить направление течения реки Чёрная</div></div>`,
              type: 'single',
              answers: [
                [
                  {
                    title: 'с юго- запада на северо-восток',
                    correct: true
                  },
                  {
                    title: 'с юга на север',
                    correct: false
                  },
                  {
                    title: 'с северо-востока на юго-восток',
                    correct: false
                  },
                  {
                    title: 'с запада на восток',
                    correct: false
                  }
                ]
              ],
              img: '2_0.jpg'
            },
            // 2 - 3
            {
              title: `<div class="dialog__content--wrapper"><div class="dialog__content--wrapper-img"><img src="img\\2_0.jpg"></div>
              <div class="dialog__content--wrapper-text">Определить на каком берегу реки Чёрная расположен колодец?</div></div>`,
              type: 'single',
              answers: [
                [
                  {
                    title: 'на левом',
                    correct: true
                  },
                  {
                    title: 'на правом',
                    correct: false
                  }
                ]
              ],
              img: '2_0.jpg'
            }
          ],
          final: {
            title: `
            <div class="dialog__content--wrapper">
              <div class="dialog__content--wrapper-text">Что объединяет эти вопросы?</div>
              <div class="dialog__content--wrapper-img"><img src="./img/2_0.jpg"></div>
            </div>`,
            type: 'single',
            answers: [
              [
                {
                  title: 'военная топография',
                  correct: true
                },
                {
                  title: 'спортивное ориентирование',
                  correct: false
                },
                {
                  title: 'картографическое исследование',
                  correct: false
                },
                {
                  title: 'мониторинг ландшафтов',
                  correct: false
                }
              ]
            ],
            imgs: ['2_0.jpg']
          },
          completed: false
        },
        // 3
        {
          title: 'Новое на карте',
          questions: [
            // 3 - 0
            {
              title:
                'Русский флотоводец и мореплаватель, окончил Морской кадетский корпус. Во время русско-турецкой войны 1828–1829 гг. руководил морской блокадой Дарданелл, трижды обогнул Землю, один из первооткрывателей Антарктиды.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'М.В. Лазарев',
                    correct: true
                  },
                  {
                    title: 'Ф.Ф. Беллинсгаузен',
                    correct: false
                  },
                  {
                    title: 'И.Ф. Крузенштерн',
                    correct: false
                  },
                  {
                    title: 'Ю.Ф. Лисянский',
                    correct: false
                  }
                ]
              ],
              img: '3_0.jpg'
            },
            // 3 - 1
            {
              title:
                'Участвовал в  морских боях при Красной Горке и Выборгской бухте. Пионер дальнего плавания, человек, который первым гордо пронёс русский военно-морской флаг через все океаны планеты, совершив  кругосветное путешествие.  Составил  «Атлас Южного моря». В 1827 году был назначен директором Морского кадетского корпуса.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'И.Ф. Крузенштерн',
                    correct: true
                  },
                  {
                    title: 'М.П. Лазарев',
                    correct: false
                  },
                  {
                    title: 'Ф.Ф. Беллинсгаузен',
                    correct: false
                  },
                  {
                    title: 'Ю.Ф. Лисянский',
                    correct: false
                  }
                ]
              ],
              img: '3_1.jpg'
            },
            // 3 - 2
            {
              title:
                'Один из выдающихся географов XIX века, адмирал русского флота, известный своими исследованиями Арктики и кругосветным плаванием. Добился разрешения на создание Русского географического общества, которым руководил свыше 20 лет. Его именем были названы 22 географических объекта в Арктике и в Тихом океане.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Ф.П. Литке',
                    correct: true
                  },
                  {
                    title: 'О.Е. Коцебу',
                    correct: false
                  },
                  {
                    title: 'М.Н. Станюкевич',
                    correct: false
                  },
                  {
                    title: 'Н.П. Резанов',
                    correct: false
                  }
                ]
              ],
              img: '3_2.jpg'
            },
            // 3 - 3
            {
              title:
                'Русский адмирал, географ, гидрограф, метеоролог, историк. Совершил три кругосветных путешествия, возглавлял экспедицию по северо-восточному побережью Сибири, исследовал территорию от Берингова пролива до Калифорнии, основал метеорологическую обсерваторию. Его Именем  названы острова в Северном Ледовитом и Тихом океанах, гора на Аляске, мыс, бухта и горы на Алеутских островах',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Ф.Ф. Врангель',
                    correct: true
                  },
                  {
                    title: 'М.П. Лазарев',
                    correct: false
                  },
                  {
                    title: 'П.С. Нахимов',
                    correct: false
                  },
                  {
                    title: 'Ф.Ф. Ушаков',
                    correct: false
                  }
                ]
              ],
              img: '3_3.jpg'
            }
          ],
          final: {
            title: `
            <div class="final-wrapper">
              <div class="final-text">Что объединяет этих людей?</div>
              <div class="final-images">
                <div class="image-wrapper"><img src="./img/3_0.jpg"></div>
                <div class="image-wrapper"><img src="./img/3_1.jpg"></div>
                <div class="image-wrapper"><img src="./img/3_2.jpg"></div>
                <div class="image-wrapper"><img src="./img/3_3.jpg"></div>
              </div>
            </div>`,
            type: 'single',
            answers: [
              [
                {
                  title: 'Мореплаватели-первооткрыватели',
                  correct: true
                },
                {
                  title: 'Исследователи-путешественники',
                  correct: false
                },
                {
                  title: 'Военные картографы',
                  correct: false
                },
                {
                  title: 'Руководители РГО',
                  correct: false
                }
              ]
            ],
            imgs: ['3_0.jpg', '3_1.jpg', '3_2.jpg', '3_3.jpg']
          },
          completed: false
        },
        // 4
        {
          title: 'Ландшафты',
          questions: [
            // 4 - 0
            {
              title:
                'Во время Великой Отечественной войны в этом районе шли самые высокогорные в мировой истории бои, не зря этот фронт затем стали называть «заоблачным». Как называются эти горы и какое кодовое название дал Гитлер операции по захвату великого горного массива?',
              type: 'multi',
              answers: [
                [
                  {
                    title: 'Кавказ',
                    correct: true
                  },
                  {
                    title: 'Урал',
                    correct: false
                  },
                  {
                    title: 'Саяны',
                    correct: false
                  },
                  {
                    title: 'Алтай',
                    correct: false
                  }
                ],
                [
                  {
                    title: 'Подснежник',
                    correct: false
                  },
                  {
                    title: 'Эдельвейс',
                    correct: true
                  },
                  {
                    title: 'Нарцисс',
                    correct: false
                  },
                  {
                    title: 'Гладиолус',
                    correct: false
                  }
                ]
              ]
            },
            // 4 - 1
            {
              title:
                'Этот Переход  стал беспрецедентным в истории. Никто ни до, ни после  не совершал его в зимнее время. Героический поход русской армии по горам в районе перевала Сен-Готард, называли «царством ужаса.  При подходе  нашей армии  французы разрушили  Чертов мост. Русские солдаты под огнем противника шарфами связывали бревенчатые перекрытия и шли в штыковую атаку, срываясь  с 25-метровой высоты, разбивались о камни и тонули в ледяной воде горного потока, но бой был выигран.  Как звали великого полководца под командованием которого был совершен этот переход и через какие горы?',
              type: 'single',
              answers: [
                [
                  {
                    title: 'А.В. Суворов',
                    correct: true,
                    group: 1
                  },
                  {
                    title: 'М.И. Кутузов',
                    correct: false,
                    group: 1
                  },
                  {
                    title: 'П.И. Багратион',
                    correct: false,
                    group: 1
                  },
                  {
                    title: 'М.Д. Скобелев',
                    correct: false,
                    group: 1
                  }
                ],
                [
                  {
                    title: 'Карпаты',
                    correct: false,
                    group: 2
                  },
                  {
                    title: 'Альпы',
                    correct: true,
                    group: 2
                  },
                  {
                    title: 'Судеты',
                    correct: false,
                    group: 2
                  },
                  {
                    title: 'Родопы',
                    correct: false,
                    group: 2
                  }
                ]
              ]
            },
            // 4 - 2
            {
              title:
                'Битва за эту реку — это ряд взаимосвязанных стратегических операций Великой Отечественной войны, проведённых во второй половине 1943 года. С обеих сторон в битве приняло участие до 4 млн человек, а её фронт растянулся на 750 километров. Операция длилась 4 месяца. Что это за река?',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Днепр',
                    correct: true
                  },
                  {
                    title: 'Дон',
                    correct: false
                  },
                  {
                    title: 'Волга',
                    correct: false
                  },
                  {
                    title: 'Нева',
                    correct: false
                  }
                ]
              ]
            },
            // 4 - 3
            {
              title:
                'Это озеро – исторический памятник великого подвига русского народа. Здесь в 1242 г. Произошло знаменитое Ледовое побоище. Это пресноводное озеро лежит на северо-западе  страны. Котловина озера ледникового происхождения. Назовите данное озеро?',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Чудское',
                    correct: true
                  },
                  {
                    title: 'Ладожское',
                    correct: false
                  },
                  {
                    title: 'Онежское',
                    correct: false
                  },
                  {
                    title: 'Телецкое',
                    correct: false
                  }
                ]
              ]
            }
          ],
          final: {
            title: `
            <div class="final-wrapper">
              <div class="final-text">Что объединяет эти вопросы?</div>
              <div class="final-images"></div>
            </div>`,
            type: 'single',
            answers: [
              [
                {
                  title: 'Природные рубежи',
                  correct: true
                },
                {
                  title: 'Природно - территориальные комплексы',
                  correct: false
                },
                {
                  title: 'Ландшафты',
                  correct: false
                },
                {
                  title: 'Физико-географические объекты',
                  correct: false
                }
              ]
            ]
          },
          completed: false
        },
        // 5
        {
          title: 'Картины',
          questions: [
            // 5 - 0
            {
              title:
                'Картина «Синопский бой»  отражает события Крымской войны 1853-1856 гг., когда 18 ноября 1853 года состоялось морское сражение в Синопской бухте между  турецкой и русской эскадрами',
              type: 'single',
              answers: [
                [
                  {
                    title: 'И.К. Айвазовский',
                    correct: true
                  },
                  {
                    title: 'В.Д. Поленов',
                    correct: false
                  },
                  {
                    title: 'И.И. Шишкин',
                    correct: false
                  },
                  {
                    title: 'И.И. Левитан',
                    correct: false
                  }
                ]
              ],
              img: '5_0.jpg'
            },
            // 5 - 1
            {
              title:
                '«Апофеоз войны» — картина русского художника  На раме сделана надпись: «Посвящается всем великим завоевателям — прошедшим, настоящим и будущим».',
              type: 'single',
              answers: [
                [
                  {
                    title: 'А.К. Саврасов',
                    correct: false
                  },
                  {
                    title: 'В.В. Верещагин',
                    correct: true
                  },
                  {
                    title: 'А.И. Куинджи',
                    correct: false
                  },
                  {
                    title: 'А.В. Куприн',
                    correct: false
                  }
                ]
              ],
              img: '5_1.jpg'
            },
            // 5 - 2
            {
              title:
                'Картина «Оборона Севастополя» скорбная и величественная героическая эпопея о подвиге защитников Севастополя. отдавших свою жизнь при обороне города в 1942 году.',
              type: 'single',
              answers: [
                [
                  {
                    title: ' А.А. Дейнека',
                    correct: true
                  },
                  {
                    title: 'Н.К. Рерих',
                    correct: false
                  },
                  {
                    title: 'И.Н. Крамской',
                    correct: false
                  },
                  {
                    title: 'В.М. Васнецов',
                    correct: false
                  }
                ]
              ],
              img: '5_2.jpg'
            },
            // 5 - 3
            {
              title:
                'Картина «Мать партизана». Художник показал  столкновение русской женщины,  олицетворяющей  всех матерей, которые отправили своих детей на войну, она готова с достоинством принять боль и страдания во имя своей отчизны и немца. Мужество русских людей и максимальную стойкость в великой борьбе. Родина – мать, как мать партизана – бесстрашная и могучая, до последнего стоит за своих детей.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'С.В. Герасимов',
                    correct: true
                  },
                  {
                    title: 'И.Е. Репин',
                    correct: false
                  },
                  {
                    title: 'В.М. Васнецов',
                    correct: false
                  },
                  {
                    title: 'М.А. Врубель',
                    correct: false
                  }
                ]
              ],
              img: '5_3.jpg'
            }
          ],
          completed: false
        },
        // 6
        {
          title: 'Военные профессии',
          questions: [
            // 6 - 0
            {
              title:
                'Представитель этой профессии может управлять судном, боевыми ракетами и торпедными установками, обеспечивать  функционирование двигательной системы судна. Необходимо иметь твёрдый уравновешенный характер, быструю реакцию и сообразительность, устойчивость к психофизиологическому состоянию.  Получить эту профессию возможно в ВУЗах им. Ф.Ф.Ушакова, П.С. Нахимова, А.С. Попова.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Военный моряк',
                    correct: true
                  },
                  {
                    title: 'Военный летчик',
                    correct: false
                  },
                  {
                    title: 'Военный метеоролог',
                    correct: false
                  },
                  {
                    title: 'Военный картограф',
                    correct: false
                  }
                ]
              ]
            },
            // 6 - 1
            {
              title:
                'Представитель этой   профессии могут  с помощью специального оборудования осуществлять весь цикл создания топографических карт — от организации полевых экспедиций для получения актуальных сведений о состоянии местности до составления и публикации на основании этих данных новых карт в типографском или электронном виде.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Военный картограф',
                    correct: true
                  },
                  {
                    title: 'Военный моряк',
                    correct: false
                  },
                  {
                    title: 'Военный метеоролог',
                    correct: false
                  },
                  {
                    title: 'Военный летчик',
                    correct: false
                  }
                ]
              ]
            },
            // 6 - 2
            {
              title:
                'Представитель этой   военной  профессии обеспечивает командование и лётный состав всеми видами гидрометеорологической и геофизической информации для эффективного применения авиации и обеспечения безопасности полётов.',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Военный метеоролог',
                    correct: true
                  },
                  {
                    title: 'Военный картограф',
                    correct: false
                  },
                  {
                    title: 'Военный моряк',
                    correct: false
                  },
                  {
                    title: 'Военный летчик',
                    correct: false
                  }
                ]
              ]
            },
            // 6 - 3
            {
              title:
                'Представитель этой  профессии  входит в состав элитной части армии любой страны и могут быть истребителями, бомбардировщиками тактического и стратегического типа, разведчиками…',
              type: 'single',
              answers: [
                [
                  {
                    title: 'Военный метеоролог',
                    correct: false
                  },
                  {
                    title: 'Военный картограф',
                    correct: false
                  },
                  {
                    title: 'Военный моряк',
                    correct: false
                  },
                  {
                    title: 'Военный летчик',
                    correct: true
                  }
                ]
              ]
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
    this.eventsInit()
  },
  watch: {
    zoomed: function (val, oldVal) {
      if (val !== oldVal) {
        this.info = `viewBox: ${this.svg.attr('viewBox')}`
      }
    },
    sQIdx: function () {
      if (_.isNil(this.nodes[this.qIdx].childrens[this.sQIdx])) {
        this.sQIdx--
      }

      console.log('sQIdx', this.sQIdx)
    },
    qIdx: function () {
      if (_.isNil(this.nodes[this.qIdx])) {
        this.qIdx--
        this.$emit('end', this.score)
      }
    }
  },
  computed: {
    width: () => {
      return 800
    },
    height: () => {
      return 600
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

      const svgDefs = this.svg.append('defs')

      const mainGradient = svgDefs.append('linearGradient').attr('id', 'mainGradient')
      mainGradient.append('stop').attr('class', 'stop-left').attr('offset', '0')
      mainGradient.append('stop').attr('class', 'stop-right').attr('offset', '1')
      // star
      let x = utils.translateCoords(this.nodes[0].position.x, this.width)
      let y = utils.translateCoords(this.nodes[0].position.y, this.height)
      let pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageStar')
        .attr('x', x - this.innerRadius - 1)
        .attr('y', y - this.innerRadius - 1)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')
      // fluger
      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2 + 2)
        .attr('height', this.innerRadius * 2 + 2)
        .attr('xlink:href', './img/star.jpg')

      x = utils.translateCoords(this.nodes[1].position.x, this.width)
      y = utils.translateCoords(this.nodes[1].position.y, this.height)

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageFluger')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/fluger.jpg')

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageFluger2')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/fluger-disabled.jpg')
      // compas

      x = utils.translateCoords(this.nodes[2].position.x, this.width)
      y = utils.translateCoords(this.nodes[2].position.y, this.height)
      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageCompas')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/compas.jpg')

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageCompas2')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/compas-disabled.jpg')
      // ship
      x = utils.translateCoords(this.nodes[3].position.x, this.width)
      y = utils.translateCoords(this.nodes[3].position.y, this.height)
      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageShip')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/ship.jpg')

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageShip2')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/ship-disabled.jpg')

      x = utils.translateCoords(this.nodes[5].position.x, this.width)
      y = utils.translateCoords(this.nodes[5].position.y, this.height)

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageRama')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/rama.jpg')

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageRama2')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/rama-disabled.jpg')

      x = utils.translateCoords(this.nodes[4].position.x, this.width)
      y = utils.translateCoords(this.nodes[4].position.y, this.height)

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageRubeg')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/rubeg.jpg')

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageRubeg2')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/rubeg-disabled.jpg')

      x = utils.translateCoords(this.nodes[6].position.x, this.width)
      y = utils.translateCoords(this.nodes[6].position.y, this.height)

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageProff')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/proff.jpg')

      pattern = svgDefs
        .append('pattern')
        .attr('id', 'imageProff2')
        .attr('x', x - this.innerRadius)
        .attr('y', y - this.innerRadius)
        .attr('height', 256)
        .attr('width', 256)
        .attr('patternUnits', 'userSpaceOnUse')

      pattern
        .append('image')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.innerRadius * 2)
        .attr('height', this.innerRadius * 2)
        .attr('xlink:href', './img/proff-disabled.jpg')

      const image = this.svg.append('image')
      image
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('xlink:href', './img/map-bg.jpg')
        .attr('preserveAspectRatio', 'none')
        .attr('id', 'imageMap')

      let road = []
      for (const node of this.nodes) {
        let x = utils.translateCoords(node.position.x, this.width)
        let y = utils.translateCoords(node.position.y, this.height)
        for (const child of node.childrens) {
          this.drawChild(child, x, y, node.id)
        }
        let g
        if (node.id === 0) {
          g = this.svg.append('g').attr('class', 'station').attr('id', `node_${node.id}`)
        } else {
          g = this.svg.append('g').attr('class', 'station disabled').attr('id', `node_${node.id}`)
        }

        g.append('circle').attr('r', this.innerRadius).attr('cx', x).attr('cy', y)

        road.push({ x: x, y: y })
      }

      for (let i = 0; i < road.length - 1; i++) {
        let angle = utils.getAngle([road[i].x, road[i].y, road[i + 1].x, road[i + 1].y])
        let g = this.svg
          .append('g')
          .attr('class', 'road')
          .attr('id', `roadto_${this.nodes[i + 1].id}`)
          .style('opacity', 0)
        g.append('line')
          .attr('x1', road[i].x + utils.getX(this.innerRadius + 2, road[i].x, road[i + 1].x, angle))
          .attr('y1', road[i].y + utils.getY(this.innerRadius + 2, road[i].y, road[i + 1].y, angle))
          .attr('x2', road[i + 1].x + utils.getX(this.innerRadius + 2, road[i + 1].x, road[i].x, angle))
          .attr('y2', road[i + 1].y + utils.getY(this.innerRadius + 2, road[i + 1].y, road[i].y, angle))
      }
    },
    eventsInit() {
      let that = this
      d3.selectAll('.station').on('click', function () {
        if (!d3.select(this).classed('disabled') && !d3.select(this).classed('completed')) {
          let viewbox = that.VIEWBOX.split(' ')
          let bbox = this.getBBox()
          let vb = [bbox.x - bbox.width / 1.1, bbox.y - bbox.height / 1.3, viewbox[2] / 5, viewbox[3] / 4].join(' ')
          let svg = d3.select('svg')
          let node = that.nodes.filter((i) => i.id == d3.select(this).attr('id').split('_')[1])

          if (!that.zoomed) {
            svg
              .transition()
              .duration(1000)
              .attr('viewBox', vb)
              .on('end', () => {
                let t = 500
                for (const child of node[0].childrens) {
                  if (child.show) {
                    that.showChild(node[0], child.id, t)
                    t += 200
                  }
                }
                that.zoomed = true
              })
          } else {
            svg
              .transition()
              .duration(500)
              .attr('viewBox', that.VIEWBOX)
              .on('end', () => {
                let t = 800
                for (const child of node[0].childrens) {
                  that.hideChild(node[0], child.id, t)
                  t /= 2
                }
                that.zoomed = false
              })
          }
        }
      })
      d3.selectAll('.sub-station').on('click', function () {
        that.showQuestion(parseInt(d3.select(this).attr('id').split('_')[1]))
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
    },
    handleCloseDialog(result) {
      this.dialog = false
      let t = 200
      this.sQIdx++
      if (result) {
        this.score++
      }
      console.log('dialog closed with', result)
      if (this.isChildrensVisible()) {
        this.nodes[this.qIdx].childrens[this.currentId].show = false
        this.hideChild(this.nodes[this.qIdx], this.currentId, 500 + (this.sQIdx + 1) * t)
      } else {
        this.questions[this.qIdx].completed = true
      }
      if (
        !this.isChildrensVisible() &&
        !_.isNil(this.questions[this.qIdx].final) &&
        !this.questions[this.qIdx].completed
      ) {
        let tmp = _.cloneDeep(this.questions[this.qIdx].final)
        tmp.answers = tmp.answers.map((i) => (i = _.shuffle(i)))
        this.currentQuestion = tmp
        setTimeout(() => {
          this.dialog = true
        }, 1500)
      } else {
        //
        if (!this.isChildrensVisible()) {
          this.svg
            .transition()
            .duration(500)
            .attr('viewBox', this.VIEWBOX)
            .on('end', () => {
              this.zoomed = false
              d3.select(`#node_${this.qIdx}`).attr('class', 'station completed')
              this.qIdx++
              d3.select(`#node_${this.qIdx}`).attr('class', 'station')
              d3.select(`#roadto_${this.qIdx}`).transition().duration(500).style('opacity', 1)
            })
        }
      }
    },
    isChildrensVisible() {
      for (const child of this.nodes[this.qIdx].childrens) {
        if (child.show) return true
      }
      return false
    },
    showQuestion(id) {
      this.currentId = id
      let tmp = _.cloneDeep(this.questions[this.qIdx].questions[this.currentId])
      tmp.answers = tmp.answers.map((i) => (i = _.shuffle(i)))
      this.currentQuestion = tmp
      this.currentCat = this.questions[this.qIdx].title
      this.dialog = true
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

.info-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
  font-size: 200%;
  font-weight: bolder;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 4px grey;
}
</style>