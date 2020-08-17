<template>
  <div class="report">
    <Content>
      <h1 class="h4 text-center mb-1">Well done {{ getProfile.name }}!</h1>
      <h2 class="text mb-5 text-center">Here’s your first report</h2>

      <!--<div class="report-notifications">
        To keep respones private (and honest), I will wait until I have recieved at
        least 4 responses, I will send you their answers and update you as I receive more.
      </div>-->

      <div class="diagram__title-with-respondents mb-3">
        <!--<div class="report__respondents">
          <svg class="report__respondents-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.42 15.93">
            <circle
              fill="none"
              stroke="#999"
              stroke-miterlimit="10"
              cx="6.21"
              cy="4"
              r="3.91"/>
            <path
              fill="none" stroke="#999" stroke-miterlimit="10"
              d="M2.29,16a5.71,5.71,0,0,1,11.34-.92,5.62,5.62,0,0,1,.08.92"
              transform="translate(-1.79 -0.07)"
            />
          </svg>
          Respondents:  {{ respondentsCount }}
        </div>-->
      </div>

      <div class="h5 mb-4">
        You guessed you are
      </div>
      <Card
        :title="getCard.title"
        :showText="getCard.showText"
        :hideText="getCard.hideText"
        :img="getCard.src"
      />

      <div class="h5 mb-4">
        Based on your answers
      </div>
      <Card
        :title="getCard.title"
        :showText="getCard.showText"
        :hideText="getCard.hideText"
        :img="getCard.src"
        :defaultOpen="true"
      />

      <div class="diagram mb-5">
        <ECharts
          :options="radar"
          ref="radar"
          autoresize
        />
      </div>

      <b-modal
        id="modal-multi-1"
        hide-footer
      >
        <template v-slot:modal-title>
          Share with friends
        </template>
        <p class="text mb-3">
          Well John, it’s time to find out what your friends think about your personality.
        </p>
        <p class="text mb-4">
          Send this link to as many people as you like.
          Remember the wisdom of crowd; the more people you send it to the wiser the result!
        </p>
        <InputCopy v-model="shareLink" class="mb-4" />
      <!--<Share :url="shareLink" />-->
      </b-modal>
      <button
        v-b-modal.modal-multi-1
        class="button button_w-100 button_theme-default button_size-m">
        Share with contacts
      </button>
    </Content>
  </div>
</template>

<script>
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/legend';
import ECharts from 'vue-echarts';
import Card from '@components/Card/Card.vue';
import InputCopy from '@components/InputCopy/InputCopy.vue';
import Content from '@components/Content/Content.vue';

import { mapGetters } from 'vuex';

export default {
  components: {
    ECharts,
    Card,
    InputCopy,
    Content,
  },
  name: 'Report',
  data: () => ({
    respondentsCount: 6,
    shareLink: null,
    tag: null,
    cards: {
      ESFP: {
        title: 'Entertainer',
        src: '/img/entertainer.svg',
        showText: 'As an ESFP you’re very enthusiastic, approachable and encapsulating of everything that an extrovert is! Highly charming and engaging, and generous with your energy, you’re often the first to help someone out, providing support and practical advice. However, though you like to draw out other people and help them have a good time, you can be very private with the more serious or negative aspects of your life. ',
        hideText: 'ESFPs often struggle with traditional education techniques, such as learning by rote. If this is you then, where possible, try and find ways to get hands-on with your subject - whether that be through plays, building something, or presenting something. Try to find opportunities to make the thing you want to learn fun and active instead of just buried in books! \n'
          + '\n'
          + 'This struggle with education goes hand-in-hand with ESFPs dislike for long-term planning, t\n'
          + 'ending to be spontaneous and living in the moment. This can hamper the progress of ESFPs looking to make future progress. ESFPs should look to formulate broad plans into sets of daily goals that they try to tick off each day. Start off with only a couple at first, and then add more as your tolerance builds.',
      },
      ESTP: {
        title: 'Entrepreneur',
        src: '/img/enterpreneur.svg',
        showText: 'ESTPs are inspiring thrill-seekers, who love to jump from urgency to urgency solving problems and spending life at the eye of the storm.\n'
          + 'Full of passion and energy, they are natural leaders, bringing people on a common path, and using their unique skill for noticing small, personal details to adapt their personality to engage everyone.\n'
          + 'Though ESTPs often use this skill to keep people lively and on their toes, they have to be careful in not taking it too far and exposing something that someone wanted to be kept quiet.',
        hideText: 'Though ESTPs enjoy jumping from fire to fire, solving the problem. This often isn’t coherent for long term plans to come together. In cases where ESTPs find themselves battling multiple fires, they should try and take a step back. Ask yourself: does this have to be solved immediately?\n'
          + 'If the answer is no, it may be possible to let the fire burn a bit longer as you focus on making headway into a longer term goal.\n'
          + '\n'
          + 'Further, the constant battle with problem solving often means that ESTPs neglect “the person in the mirror”. As an ESTP you should try and carve a small portion out of your day or week to address personal issues and aspects. Particularly think about those points around dealing with others’ emotions, and how best to respond and protect them.',
      },
      ISTJ: {
        title: 'Logistician',
        src: '/img/logistican.svg',
        showText: 'ISTJs are dedicated organisers, who happily expend their time and energy completing tasks with accuracy and patience. They value truth very highly, and often report their own failings, even if it reflects badly on themselves.\n'
          + 'ISTJs are neat and orderly, and often use these skills to uphold important traditions and standards. Their practical logic often sees them relaying facts to people and expecting them to grasp what they are saying.',
        hideText: 'As with ISFJs, ISTJs may find their dependence and reliability allowing others in their life to shift their workload onto them, knowing that they’re take up the chore. Often this can accumulate and build stress and tension until a tipping point is reached and they collapse under the weight of work.\n'
          + 'In these cases, ISTJs need to get better at saying “no” to tasks and people. As long as this is followed by a sincere reason that the task cannot be achieved, then the person unloading the task will be hard pressed not to take it back.\n'
          + '\n'
          + 'For ISTJs honesty is an incredibly important aspect of life, and can come at the expense of relationships and emotional arguments. Next time someone propositions you with an idea, think about why they may be asking, and why they are seeking the answer they want. Honesty may not initially be the best policy, it may be more logical to gently guide them to a conclusion and keep the relationship and their emotions intact.',
      },
      ISTP: {
        title: 'Virtuoso',
        src: '/img/virtuoso.svg',
        showText: 'ISTPs are tolerant makers, unable to stay focussed on formal studies they often find themselves tinkering with the mechanics of something - hoping to understand the process. This spills over into their life more widely, observing how things work and looking for practical solutions to the problem at hand.\n'
          + 'Though their privacy and  preoccupation with mechanics can make them appear simple, ISTPs are actually extremely friendly and enigmatic.',
        hideText: 'ISTPs may struggle with task completion where, having understood something, they move onto the next project without completely implementing the final one, searching for novelty. \n'
          + 'This plays into the broader ISTP trait of a struggle to commitment. Instead of thinking about the weeks or months it may take to implement something, simply tackle the day-to-day aspect of the task. You get to live in the present, whilst also achieving something long-term. This doesn’t only have to apply to work, but can apply to other aspects such as relationship.\n'
          + '\n'
          + 'Another benefit of daily scheduling allows you, as an ISTP, to achieve more of the projects you love. If you are careful with your time management, then you will be able to be more productive and avoid some of the procrastination that may creep into your day.',
      },
      ESTJ: {
        title: 'Executive',
        src: '/img/executive.svg',
        showText: 'ESTJs are dedicated executives, often leading organisations and people. They have an utter rejection of laziness and cheating, and often choose to set an exemplary working example themselves.\n'
          + 'Highly rational and conscientious, their highly methodical nature helps to give others clear advice and direction, even in times of uncertainty.\n'
          + 'As an ESTJ, this adhesion to strong work ethic may see you struggle to cut loose and relax outside of a work environment.',
        hideText: 'As relentless planners and executors, ESTJs have a reputation of bulldozing through others’ sensitivities in order to achieve a goal.\n'
          + 'When a situation next arises in which you feel yourself about to put someone down for their emotional response, try and understand why that response has been elicited. Though you may find it an inconvenience, is it impossible to find an alternate solution that doesn’t tread on the toes of this person?\n'
          + '\n'
          + '   \n'
          + 'This strategy also allows others to express opinions and solutions different to your own. Instead of opposing these suggestions just on account of their novelty, allow them to run with the idea, and help shape it into a viable solution. Allowing others to generate ideas may help your own creativity and novelty.',
      },
      ESFJ: {
        title: 'Consul',
        src: '/img/consul.svg',
        showText: 'ESFJs are altruistic service-people. With decisive values and a willingness to offer help to others, they enjoy any role that allows them to participate in a meaningful way. These characteristics often mean you can find ESFJs taking part in community and social projects, but they prefer plans and organised events to anything spontaneous.\n'
          + 'Highly attuned to their emotional environment and attentive to the feelings of others, they are often the ones at a party finding time to laugh and chat with everyone.',
        hideText: 'ESFJs are highly dependent on the praises of, and interactions with, others. In order to overcome this barrier for constant validation and reassurance, ESFJs should practice a solo hobby. This will allow them to get comfortable with their own thoughts, feeling and silence. It also has the secondary benefit of allowing them to reflect on their interactions with others - perhaps allowing them to separate others emotions from their own, which is a known source of emotional drain for this personality type.\n'
          + '\n'
          + 'Coupled with this constant need for validation, is the idea that ESFJs have to please everyone - an impossible task at the best of times. Remember that there will always be someone who disagrees with you, and far from this being a personal attack is just them expressing their own opinion as well. Just step back and accept it, it’s not a reflection on your character.',
      },
      INTJ: {
        title: 'Architect',
        src: '/img/architect.svg',
        showText: 'INTJs are analytic problem-solvers, confident in mastering their chosen subjects and enjoy sharing their knowledge with others. They are always on the lookout for new tactics and strategies to improve their lives at either work or home. Though their creativity and inner personality is often largely shielded from the outside World. ',
        hideText: 'Often INTJs internalise a lot of their thoughts, leaping from A to B to Z and leaving others behind. Other people may struggle to keep up with such quick speed. When explaining stuff to other people don’t be afraid to take them on the journey with you. The ideas don’t have to be fully formed as they come out of your mouth, people can act as a sounding board for that.\n'
          + 'Using this process will also help you see the floors in your own arguments and plans!\n'
          + '\n'
          + 'Further, when people voice plans that contradict your own, this isn’t personal – but bear in mind that any reply may feel personal to them. Remember, for others, emotional considerations and history are hugely influential – and considering the feelings of others isn’t illogical, but more logical when it helps reach a conclusion!',
      },
      INTP: {
        title: 'Logician',
        src: '/img/logician.svg',
        showText: 'INTPs are theoretical unifiers, who love to spot patterns and solutions to issues. Though actually relaxed and friendly, they can be seen as detached due to their constantly whirring minds trying to find the meaning of life and the things they see. \n'
          + 'INTPs love to come up with unique ideas to solutions, particularly if they don’t follow the direction of the crowd!',
        hideText: 'Occasionally INTPs allow the logic and detail of the situation to blind them to the emotional considerations and impact on others. Coupled with this, there is a risk of being caught in their own logical fallacies. To combat both of these, consider bringing others into your life decision making processes. Having someone else as a sound-board will help your ideas develop, and further bringing parties in to your decisions allows you to begin to appreciate their emotional consideration – take notice of it!\n'
          + '\n'
          + 'INTPs remain so open to new information that can delay their output indefinitely with constant revisions. Next time you find yourself doing this, ask yourself whether you could get away with pushing the work out as-is. If it’s truly important you can come back and iterate on it, but in the mean time it may be helpful to others to see your 80% completed plan to know what you’re thinking about.',
      },
      ENFP: {
        title: 'Campaigner',
        src: '/img/campaigner.svg',
        showText: 'ENFPs are compassionate creators, who particularly enjoy the social and emotional connections they make with others. They can be a passionate, driven idealist one moment, and when the time to relax comes an energetic dancer the next.\n'
          + 'Their curious minds allow them to read between the lines and come up with independent solutions, but that energy can wane if it has to be spent on the admin of the implementation.',
        hideText: 'ENFPs can be prone to overthinking in many aspects of life, which can lead to stress or lack of sleep. With some plans, not all the details have to precisely fit – if 90% of the whole is there, then it’s probably a reasonably good plan. Equally, don’t overthink what people say or do – often it’s not personal, and if you take it to heart and react badly then that has potential to damage the relationship.\n'
          + '\n'
          + 'Traditionally, ENFPs have a fairly low tolerance for administrative matters. This can be a big disconnect with the nature of day-to-day life. Try and build up this tolerance bit-by-bit by taking up more admin matters at home, and then let that slowly progress into work. Though it may initially be boring, the routine and process will gradually get easier.',
      },
      ENTJ: {
        title: 'Commander',
        src: '/img/commander.svg',
        showText: 'ENTJs are motivated leaders. These individuals love the thrill of a challenge and use their drive and logical thought to achieve whatever they put their minds to.\n'
          + 'This drive and charisma projects authority and leadership and this, in turn, draws people into helping with the cause. \n'
          + 'Though this high level of rationality makes for an excellent strategic thinker, it can make others think the ENTJ type is dominant and unforgiving. As an ENTJ you may have to be careful about what your goals need from others in order to be reached.',
        hideText: 'Often finding themselves in positions of leadership, ENTJs have to be careful about how they treat their team. Remember that the goal may not be the final one, a good team is irreplaceable, and to burn them out on a single mission may be unwise. Take into account the team’s feelings, build those relationships, and it will mean the team is able to complete multiple goals over-and-over again.\n'
          + '\n'
          + 'Their quick wit and logical thinking often leads ENTJs to complete sentences, interrupt and make rapid (though perhaps not correct) assumptions. In social situations and work, take the time to completely hear out other people’s points without interruption. Importantly take it on board and allow them to run with the idea – it may reveal something about them or the situation that you hadn’t conceived!',
      },
      ENTP: {
        title: 'Debater',
        src: '/img/debater.svg',
        showText: 'ENTPs are intellectual pioneers, constantly sparing with the ideas of themselves and others to find new solutions to problems. Playing devil’s advocate helps them to break down problems from all aspects, and allows them to comprehend the people and systems around them.\n'
          + 'However, like ENFPs, though the solutions may come easily to ENTPs, the implementation may struggle due to its routine nature.',
        hideText: 'ENTPs brilliance in debate can also be their weakness. In defending and attacking every position, they may have uncovered weaknesses, but they have not created consensus. Next time you’re involved in a debate between multiple people, see whether you can use your debating skill to elicit a solution that is both probable and agreeable. Perhaps don’t worry so much about edge cases, and instead focus on reaching a resolution. If the solution doesn’t initially work, then it may be possible to come back and update it.\n'
          + '\n'
          + 'Also, remember that a big part of working well in life, or as a team, is often getting people to be comfortable and agree. Be careful where you pick your debates, as more sensitive personality types may not be ready for the onslaught of ideas – creating tension and  perhaps burning bridges. Maybe you’d be able to voice your concerns in a more gentle or private setting?',
      },
      ENFJ: {
        title: 'Protagonist',
        src: '/img/protagonist.svg',
        showText: 'ENFJs are caring organisers, who radiate authenticity, concern and altruism. Naturally confident, they are often happiest when encouraging others to expand their horizons and seek new knowledge.\n'
          + '\n'
          + 'They are able to use their intuition to connect multiple peoples’ goals and motivations into a single common cause. ENFJs have to watch out for over-utilising their drive with others though, occasionally pushing other types further than they originally wanted to go. ',
        hideText: 'ENFJs excel at building emotional relationships with the people around them and bringing harmony to a group. However, this often comes at a cost of their own tasks in life. Though future-focussed, try maintaining a list of things to do each present day, in order to keep personal productivity (outside of others emotions) strong.\n'
          + 'Part of this can be breaking large future projects into small manageable daily goals – this will also prevent you getting overwhelmed.\n'
          + '\n'
          + 'Often ENFJs spend a lot of time reflecting on their actions and those of others. In points of difficult decision this can often leave ENFJs stuck for choice. Remember in these moments that often making no decision is worse than no decision at all. It is likely that you’re overthinking what will happen and this fear is holding you back. More often than not, these fears never materialise.',
      },
      ISFJ: {
        title: 'Defender',
        src: '/img/defender.svg',
        showText: 'ISFJs are compassionate carers, endowed with well-developed people skills and a desire to do good. They often find themselves as protectors of and providers for others, and are sensationally modest about their accomplishments.\n'
          + 'As an ISFJ you probably procrastinate, but still always achieve the job with a meticulous level of detail. Though you don’t outwardly seek validation on a public stage, when you are recognised you feel a level of warmth and satisfaction that is unrivalled among personality types.',
        hideText: 'As an ISFJ you may find yourself taking on more work than you are capable in order to avoid conflict. This build up of work can lead to worry and spill from professional to personal life and back again. Next time you are unable to take on work, give a firm no, but apologise with a sincere reason. Opening up about your situation like this will provide people with a greater understanding of what you’re going through, and it is hard for them to override a genuine reason for an inability to do work.\n'
          + '\n'
          + 'As you get more comfortable with being able to say no to people with sincere reasons, start to express your emotions and desires more to those closest to you. This will often relieve a lot of stress and frustration that has built up about matters. This is taking care of someone that you’ve probably neglected for a long time: yourself.',
      },
      ISFP: {
        title: 'Adventurer',
        src: '/img/adventurer.svg',
        showText: 'ISFPs are loyal creatives, who live in the present and express themselves through actions rather than words. They value harmony highly and will endeavour to support those that they care about, though it broadly has to stick to their own overarching principles. \n'
          + 'This adherence to their own principles can lead them to be selfish at times, but if channelled for good they can act with a surprising vigour and clarity for charity. This vigour can be seen by others, but an ISFP will occasionally have to step out of the spotlight to recharge.',
        hideText: 'ISFPs are famously spontaneous and live in the moment. Where possible you should open yourself up to those who provide visions of the future, and allow yourself to consider some broader questions about your direction in life. The creation of some guiding principles surrounding where you want to be in 5 to 10 years time will not limit your spontaneity, and can allow you to plan some shorter term goals to get you to where you want to be. \n'
          + '\n'
          + 'In work and personal life, applying some of these plans and involving people close to you can help you build more stable financial and personal relationships. If people can see where your plan leads you, then they can help you on that journey.',
      },
      INFJ: {
        title: 'Advocate',
        src: '/img/advocate.svg',
        showText: 'INFJs are a rare breed indeed. A formidable coupling of creativity and resolve that allows them to dream of an ideal future and make concrete steps to achieve it.\n'
          + 'Dedicated and with a strong sense of integrity, their talent for warm, sensitive language and a human touch often leads INFJs into careers where they find great reward in helping people.',
        hideText: 'As shown by the alternate name for INFJs: Counsellors, you likely possess an innate ability to calm down a situation, and return to tranquillity. In life however, not all disagreements can be swept away so easily. In tense and hostile situations try and use your skills to keep lines of communication open between all parties – allowing the problem to come to an understanding conclusion.\n'
          + '\n'
          + 'Though it may be difficult for INFJs, criticism is not always personal. When coming under fire, just take a moment to dissociate the criticism from your personality – try and understand where the criticism is coming from. \n'
          + 'Further, being open to friends about how you feel about criticism and other aspects of your life will help you feel supported and less likely to be emotionally drained. ',
      },
      INFP: {
        title: 'Mediator',
        src: '/img/mediator.svg',
        showText: 'INFPs are the moral idealists, always led by the purity of their intent. As a visionary, their individuality, creative flair and insight leads them to pursue a brighter future. Incredibly gifted with communication, they often reveal their inner self through beautifully crafted stories and metaphors.',
        hideText: '\n'
          + '\n'
          + 'As an INFP do you often feel crushed by the weight of the World and its problems?\n'
          + 'As an INFP, you’re likely trying to help lots of people, and getting drained as a result. Don’t forget to take care of yourself – perhaps whittle down a few of the tasks you’re doing to help. Build back up little-by-little, you need to be able to care for yourself to care for others.\n'
          + '\n'
          + 'As an incredibly passionate listener and mediator, you should not fear seeking leadership positions just because you’re not an extravert. These skills are incredibly important for such a position, and can help build large, effective co-operations.\n'
          + 'Further, a leadership position will allow you to develop attention to detail, that INFPs commonly ignore!',
      },
    },
    radar: {
      tooltip: {},
      radar: {
        name: {
          textStyle: {
            color: '#838585',
            fontSize: '12px',
          },
        },
        indicator: [
          { text: 'Empathy', max: 4 },
          { text: 'Self-sufficience', max: 4 },
          { text: 'Stability', max: 4 },
          { text: 'Dominance', max: 4 },
          { text: 'Spontaneity', max: 4 },
          { text: 'Conformity', max: 4 },
          { text: 'Audacity', max: 4 },
          { text: 'Sensitivity', max: 4 },
          { text: 'Trust', max: 4 },
          { text: 'Originality', max: 4 },
          { text: 'Warmth', max: 4 },
          { text: 'Confidence', max: 4 },
          { text: 'Logic', max: 4 },
          { text: 'Privacy', max: 4 },
          { text: 'Perfectionism', max: 4 },
          { text: 'Patience', max: 4 },
        ],
        splitArea: {
          areaStyle: {
            color: '#d2aeed',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#dac9e6',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#d2aeed',
          },
        },
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [],
            areaStyle: {
              color: 'rgba(255, 0, 0, 0.5)',
            },
            symbol: 'none',
          },
        ],
      }],
    },
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    getWidthLegend() {
      return `${25 * this.pie.series[0].data.length}%`;
    },
    getCard() {
      if (!this.tag) return null;

      return this.cards[this.tag];
    },
  },
  created() {
    this.fetchPersonalityTypeReport();
  },
  methods: {
    fetchPersonalityTypeReport() {
      this.$api.personalityTypeReport.fetchPersonalityTypeReport().then((res) => {
        this.radar.series[0].data[0].value = Object.values(res.self);
        this.tag = res.selfResult;
        this.shareLink = `${process.env.VUE_APP_URL}${res.invitationLink.substr(1)}`;
      });
    },
  },
};
</script>

<style lang="scss">
  .diagram{
    margin-left: -24px;
    margin-right: -24px;
    background-color: #fff;
    padding: 0 24px;
    position: relative;
    /*&:after{*/
    /*  content: '';*/
    /*  display: block;*/
    /*  width: 100%;*/
    /*  height: 1px;*/
    /*  background-color: #e9eaf0;*/
    /*  position: absolute;*/
    /*  left: 0;*/
    /*  top: 245px;*/
    /*}*/
    .echarts{
      width: 100%;
      height: 310px;
    }
  }
  .report__respondents{
    color: $txtColor3;
    font-family: $defaultFont;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 17px;
    display: flex;
    align-items: center;
  }
  .report__respondents-icon{
    width: 14px;
    height: 17px;
    margin-right: 5px;
  }
  .diagram__title-with-respondents{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .report-notifications{
    padding: 16px;
    border: 1px solid #ddd;
    font-family: $defaultFont;
    font-size: 14px;
    line-height: 16px;
    color: $txtColor2;
    border-radius: 4px;
    margin-bottom: 30px;
  }

  .diagram__legend{
    border-top: 1px solid #e9eaf0;
    margin: 0 -24px;
    padding: 10px 24px ;
    overflow: scroll;
  }
  .diagram__legend-list{
    display: flex;
    justify-content: space-between;
  }
  .diagram__legend-item{
    margin-right: 10px;
  }
  .diagram__legend-title{
    font-size: 12px;
    font-family: $defaultFont;
    color: #505D6F;
  }
  .diagram__legend-icon{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin-right: 5px;
  }

</style>
