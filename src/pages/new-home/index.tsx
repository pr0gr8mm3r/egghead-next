import * as React from 'react'
import {motion} from 'framer-motion'
import {
  BadgeCheckIcon,
  CheckIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  TerminalIcon,
  RssIcon,
  PuzzleIcon,
  BookmarkIcon,
  DownloadIcon,
  FastForwardIcon,
  SupportIcon,
  DocumentTextIcon,
  XIcon,
} from '@heroicons/react/solid'
import {
  Vueblue,
  Awsblue,
  Angularblue,
  Jsblue,
  Nextblue,
  Nodeblue,
  Reactblue,
  Reduxblue,
  Cssblue,
  Tsblue,
} from 'components/icons/tech-logo-icons'
import {
  PlanPrice,
  PlanIntervalsSwitch,
  PlanQuantitySelect,
} from 'components/pricing/select-plan-new/index'
import {first, get, filter} from 'lodash'
import slugify from 'slugify'
import {keys} from 'lodash'
import {track} from 'utils/analytics'
import {useViewer} from 'context/viewer-context'
import {useRouter} from 'next/router'
import emailIsValid from 'utils/email-is-valid'
import {usePricing} from 'hooks/use-pricing'
import {SyntheticEvent} from 'react'
import {StripeAccount} from 'types'

const NewHome: React.FunctionComponent = () => {
  const {viewer, authToken} = useViewer()
  const {prices, pricesLoading, quantity, setQuantity} = usePricing()
  const [priceId, setPriceId] = React.useState<string>()
  const router = useRouter()

  React.useEffect(() => {
    track('visited pricing')
    if (router?.query?.stripe === 'cancelled') {
      track('checkout: cancelled from stripe')
    }
  }, [])

  const onClickCheckout = async (event: SyntheticEvent) => {
    event.preventDefault()

    if (!priceId) return
    const account = first<StripeAccount>(get(viewer, 'accounts'))
    await track('checkout: selected plan', {
      priceId: priceId,
    })

    if (emailIsValid(viewer?.email)) {
      await track('checkout: valid email present', {
        priceId: priceId,
      })
      await track('checkout: redirect to stripe', {
        priceId,
      })
      // stripeCheckoutRedirect({
      //   priceId,
      //   email: viewer.email,
      //   stripeCustomerId: account?.stripe_customer_id,
      //   authToken,
      //   quantity,
      // })
    } else {
      await track('checkout: get email', {
        priceId: priceId,
      })
      router.push(`/pricing/email?priceId=${priceId}&quantity=${quantity}`)
    }
  }

  return (
    <div className="mt-4 sm:mt-8 w-full">
      {/* Header image */}

      {/* Headline and signup input */}
      <section className="z-10 my-8 sm:my-16 flex flex-col-reverse md:flex-row justify-between items-center max-w-screen-xl mx-auto">
        <div className="w-full md:w-3/5 mt-12 md:mt-0">
          <motion.h1
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            className="text-4xl sm:text-6xl font-bold mb-8 leading-tight text-gray-700 dark:text-white"
          >
            Learn the best JavaScript tools and frameworks from industry pros
          </motion.h1>
          <motion.h2
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.6, delay: 0.4}}
            className="text-lg sm:leading-loose text-coolGray-500 w-full md:w-3/4 dark:text-gray-300"
          >
            egghead creates high-quality video tutorials and learning resources
            for badass web developers
          </motion.h2>

          {/* email input form */}

          <motion.p
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.6, delay: 0.6}}
            className="mt-8 mb-1 text-gray-500 text-sm dark:text-gray-300"
          >
            Create your free account to start learning now
          </motion.p>
          <motion.form
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.6, delay: 0.8}}
            className=""
          >
            <div className="flex flex-row flex-wrap items-center">
              <div className="mt-1 relative rounded-md shadow-sm w-full lg:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="text-black autofill:text-fill-black py-3 placeholder-gray-400 focus:ring-indigo-500 focus:border-blue-500 block w-full pl-10 border-gray-300 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full lg:w-auto transition-all duration-150 mt-1 lg:ml-2 ease-in-out bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-sm text-white font-semibold py-3 px-5 rounded-md"
              >
                Create a free account
              </button>
            </div>
          </motion.form>
        </div>
        <motion.div
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.8, delay: 0.2}}
          className="w-4/5 md:w-2/5 ml-0 sm:ml-4 lg:ml-16"
        >
          <img
            className="min-w-full"
            width="600"
            alt="egghead course illustration"
            src="https://res.cloudinary.com/dg3gyk0gu/image/upload/v1632907878/next.egghead.io/illustrations/jsarrays_landing_page_shrink.png"
          />
        </motion.div>
      </section>

      <TechnologyRow />

      {/* Longform copy paragraphs */}
      <section className="my-12 sm:my-20 max-w-screen-xl mx-auto ">
        <div className="mx-auto md:mx-2 md:max-w-screen-md">
          <p className="uppercase mb-4 text-blue-600 font-semibold text-sm tracking-wide">
            Why bother with another learning platform?
          </p>
          <h3 className="text-2xl leading-snug mb-6 font-medium">
            Obviously you can pick up a new framework, language or platform on
            your own. You’ve done it before.
            <br />
            You know the drill...
          </h3>
          <ol className="text-white">
            {[
              {
                emoji:
                  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/disappointed-face_1f61e.png',
                text: 'Cobble together hours-long videos, docs, tutorials, and forum posts',
              },
              {
                emoji:
                  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/confounded-face_1f616.png',
                text: 'Watch long, unedited videos at 2x speed',
              },
              {
                emoji:
                  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/weary-face_1f629.png',
                text: 'Dig through the comments when tutorials give you more bugs than working code',
              },
              {
                emoji:
                  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/crying-face_1f622.png',
                text: 'Read blog post after unreliable blog post',
              },
              {
                emoji:
                  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/loudly-crying-face_1f62d.png',
                text: 'Beg for answers on StackOverflow when you hit dead ends',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-row pb-4 items-center align-center"
              >
                <img width="30" src={item.emoji} alt="crying emoji" />
                <li className="prose text-lg pl-4 dark:text-white">
                  {item.text}
                </li>
              </div>
            ))}
          </ol>
          <p className="mt-6 prose text-lg dark:text-white">
            All the while, your poor computer screams under the weight of all
            those tabs.
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            What about learning from books? Books are great! <br /> They're
            sometimes edited by professionals, which is more than you can say
            for most tutorials you find. But publishers can’t keep up with the
            pace of modern web development. You can't keep up either, at least
            not with your old approach.
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            Nobody’s paying you to find the bugs in their crummy tutorials. You
            don’t have time to dig your way out of all those rabbit holes for a
            supposedly free education.
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            So you’ve been procrastinating a little. Or… a lot.
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            Your time is precious. You're a professional.
          </p>
        </div>
      </section>

      <section className="max-w-screen-xl mb-20 mx-auto">
        <div className="mx-auto md:mx-2 md:max-w-screen-md">
          <p className="uppercase mb-4 text-blue-600 font-semibold text-sm tracking-wide">
            There <span className="underline">has</span> to be an easier way
          </p>
          <h3 className="text-2xl leading-snug mb-6 font-medium">
            Don't you wish you could jack into the Matrix and inject React
            directly to your brain?
          </h3>
          {[
            "Sounds convenient, but it's not going to happen anytime soon.",
            'But what if you had the next best thing?',
            'What if you could simply sit down and start learning? What if you could skip all the searching, the cobbling, the contradictory advice, the bugs, the forums, and the dead ends?',
            'What if you had on-demand experts avaliable to hand you the best, curated material on modern web development?',
          ].map((item) => {
            return <p className="mt-6 prose text-lg dark:text-white">{item}</p>
          })}
          <p className="mt-6 prose text-lg font-bold dark:text-white">
            Think how much easier it would be for you to <i>stay</i> on the
            bleeding edge of our industry. With just 10-30 minutes a day, you'd
            be able to power through a major topic every week.
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            With the right teacher and the right courses, this isn't a pipe
            dream.
            <br />
            Picture yourself months from now, sitting down to a heady
            programming challenge, and whispering{' '}
            <i className="font-semibold">I know wtf I am doing.</i>
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            <b>That</b> is what egghead can do for you.
          </p>
        </div>
      </section>

      <section className="max-w-screen-xl mb-20 mx-auto">
        <div className="mx-auto md:mx-2 md:max-w-screen-md">
          <p className="uppercase mb-4 text-blue-600 font-semibold text-sm tracking-wide">
            There <i>is</i> an easier way
          </p>
          <h3 className="text-2xl leading-snug mb-6 font-medium dark:text-white">
            egghead will turn you into a badass web developer.
            <br /> Learn any time, any place, at your own pace.
          </h3>
          <p className="mt-6 prose text-lg dark:text-white">
            We're here to help you level up. We've designed everything from our
            courses to our tools to our community to advance your skills without
            sacrificing your precious time.
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            egghead is <i>not</i> a sloppy video marketplace or grab-bag of
            random content.
            <br /> We're a boutique label curating{' '}
            <b>high-quality video courses for professional web developers.</b>
          </p>
          <p className="mt-6 prose text-lg dark:text-white">
            When you join egghead you'll get:
          </p>
          <ol className="mt-6">
            {[
              'Access to hundreds of courses by world-class folks like Dan Abramov, Kent C. Dodds, Jason Lengstorf, and Laurie Barth',
              'Lessons designed to teach you exactly what you need to know, without any of the fluff or cruft',
              'Code examples (without the bugs) and projects to immediately test your knowledge',
              'Professionally produced and edited videos with high-quality sound and resolution',
              'Tools to help you plan, track, and follow through on your learning goals',
            ].map((item, index) => (
              <div className="flex flex-row pb-4 items-start" key={index}>
                <BadgeCheckIcon className="w-8 h-8 text-blue-600 flex-shrink-0 relative top-1" />
                <li className="prose text-lg pl-3 dark:text-white">{item}</li>
              </div>
            ))}
          </ol>
          <p className="mt-6 prose text-lg dark:text-white">
            And unlike book publishers, we move at the speed of the web. When
            you need the most up-to-date tutorials on React, we've got you
            covered.
          </p>
          {[
            'We have over 5,000 lessons and 250+ courses, with new material released every week.',
            "Our lessons are 3-7 minutes long – short, sweet, and to the point. They're designed to be watched either individually or as part of a course, so you can jump around and get exactly the information you need.",
            "Our courses will give you a comprehensive tour through a topic. They cover all the essentials from beginning to end. This includes a realistic practice project and all the code you'll need to complete it.",
            'This means you can pick up individual skills anytime you want. New languages, frameworks, and libraries are easy to add to your professional toolkit.',
            'Learn at your desk, on the train, or in the bathroom – whenever and whereever you want. Videos, transcripts, and code examples are always avaliable – even offline.',
            'And all of it is nop-notch quality. Your secret weapon to get ahead, shine at work, and build things you love.',
          ].map((item) => {
            return <p className="mt-6 prose text-lg dark:text-white">{item}</p>
          })}
        </div>
      </section>

      {/* Benefits list section */}
      <section className="-mx-6 bg-gray-50 dark:bg-gray-900 py-5">
        <div className="max-w-screen-xl mb-0 sm:mb-8 px-6 mx-auto">
          <div className="mx-auto md:mx-2 md:max-w-screen-md">
            <p className="uppercase mb-4 text-blue-600 font-semibold text-sm tracking-wide">
              The sweet details
            </p>
            <h3 className="text-2xl leading-snug mb-6 font-medium dark:text-white">
              What you'll get as an egghead member
            </h3>
          </div>
          <BenefitsSection />
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        variants={animationVariants}
        animate="visible"
        initial="hidden"
        className="-mx-6 bg-gradient-to-b from-blue-600 to-blue-700 py-20 px-2 md:px-0"
      >
        <div className="max-w-screen-xl my-0 sm:my-12 mx-auto">
          <div className="mx-auto md:mx-2">
            <h2 className="text-white text-4xl sm:text-7xl font-bold text-center mb-8 md:max-w-screen-md mx-auto leading-tighter">
              Level Up Your Skills and Get a Better Job as a Web Developer
            </h2>
            <p className="text-blue-100 text-lg text-center mx-auto mb-12 md:mb-20 px-2 md:px-24 lg:px-80 leading-looser">
              An egghead membership will give you the skills you need to advance
              your career and build real-world, professional projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-lg mx-auto gap-4 mb-8 sm:mb-20">
              <MemberPricingSection
                prices={prices}
                pricesLoading={pricesLoading}
                handleClickGetAccess={onClickCheckout}
                quantityAvailable={true}
                onQuantityChanged={(quantity: number) => {
                  setQuantity(quantity)
                }}
                onPriceChanged={(priceId: string) => {
                  setPriceId(priceId)
                }}
              />
              <div className="w-full">
                <p className="text-blue-200 font-medium my-4 text-center">
                  Want to try us out first?
                </p>
                <FreeAccountSection />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default NewHome

// Benefits section
function BenefitsSection() {
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
        easing: 'easeInOut',
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto md:mx-2"
    >
      {[
        {
          text: '250+ comprehensive courses',
          icon: <AcademicCapIcon className="w-8 h-8 text-blue-600" />,
        },

        {
          text: 'Practice projects to apply your knowledge',
          icon: <PuzzleIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: '5500+ bite-size video lessons',
          icon: <VideoCameraIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: 'Transcripts and closed captions on every video',
          icon: <DocumentTextIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: 'Code examples for every lesson',
          icon: <TerminalIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: 'Speed controls to watch at your own pace',
          icon: <FastForwardIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: 'Downloadable videos to view offline',
          icon: <DownloadIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: 'Priority customer support and assistance',
          icon: <SupportIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: 'RSS feeds for your favourite podcasting app',
          icon: <RssIcon className="w-8 h-8 text-blue-600" />,
        },
        {
          text: 'Bookmarks to create learning plans and stay organised',
          icon: <BookmarkIcon className="w-8 h-8 text-blue-600" />,
        },
      ].map((item, i) => {
        return (
          <motion.div
            key={i}
            variants={variants}
            className="w-full border-gray-100 py-2 flex items-center"
          >
            {item.icon}
            <p className="text-left leading-tight font-medium text-lg text-gray-700 dark:text-white ml-6">
              {item.text}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// Technologies Row
function TechnologyRow() {
  return (
    <section className="my-16 md:my-28">
      <div className="flex flex-row flex-wrap items-center justify-center content-between place-content-between">
        {[
          {
            label: 'JavaScript',
            image: <Jsblue />,
          },
          {
            label: 'React',
            image: <Reactblue />,
          },
          {
            label: 'Redux',
            image: <Reduxblue />,
          },
          {
            label: 'Angular',
            image: <Angularblue />,
          },
          {
            label: 'Vue',
            image: <Vueblue />,
          },
          {
            label: 'TypeScript',
            image: <Tsblue />,
          },
          {
            label: 'CSS',
            image: <Cssblue />,
          },
          {
            label: 'Node.js',
            image: <Nodeblue />,
          },
          {
            label: 'AWS',
            image: <Awsblue />,
          },
          {
            label: 'Next.js',
            image: <Nextblue />,
          },
        ].map((tech, i) => {
          return (
            <motion.div
              className="flex flex-col items-center"
              key={i}
              initial={{opacity: 0, y: 40}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: i * 0.1}}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 px-1 mx-3 my-2 flex items-center">
                {tech.image}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

type MemberPricingProps = {
  prices: any
  pricesLoading: boolean
  defaultInterval?: string
  defaultQuantity?: number
  handleClickGetAccess: (event: any) => any
  quantityAvailable: boolean
  onQuantityChanged: (quantity: number) => void
  onPriceChanged: (priceId: string) => void
}

export const DEFAULT_FEATURES = [
  'Full access to all the premium courses',
  'Download courses for offline viewing',
  'Closed captions for every video',
  'Commenting and support',
  'Enhanced Transcripts',
  'RSS course feeds',
]

export const PlanFeatures: React.FunctionComponent<{
  planFeatures: string[]
}> = ({planFeatures = DEFAULT_FEATURES}) => {
  return (
    <ul className="mt-4">
      {planFeatures.map((feature: string) => {
        return (
          <li className="font-medium flex mb-4 w-full" key={slugify(feature)}>
            <CheckIcon className="inline-block flex-shrink-0 w-6 h-6 text-blue-600" />
            <span className="ml-4 leading-tight text-lg">{feature}</span>
          </li>
        )
      })}
    </ul>
  )
}

function BestValueBanner() {
  return (
    <motion.div
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.4, ease: 'easeInOut'}}
      className="lg:relative lg:h-0 lg:w-0 lg:top-20 lg:right-6 lg:-rotate-6"
    >
      <div className="py-3 flex text-base lg:shadow items-center justify-center h-auto w-full lg:w-32 bg-yellow-300 lg:rounded uppercase tracking-loose font-semibold relative">
        <span>Best Value</span>
      </div>
    </motion.div>
  )
}

const MemberPricingSection: React.FunctionComponent<MemberPricingProps> = ({
  quantityAvailable = true,
  handleClickGetAccess,
  defaultInterval = 'annual',
  defaultQuantity = 1,
  pricesLoading,
  prices,
  onQuantityChanged,
  onPriceChanged,
}) => {
  const individualPlans = filter(prices, (plan: any) => true)

  const annualPlan = get(prices, 'annualPrice', {
    name: 'Pro Yearly',
    interval: 'year',
  })
  const monthlyPlan = get(prices, 'monthlyPrice')
  const quarterlyPlan = get(prices, 'quarterlyPrice')

  const pricesForInterval = (interval: any) => {
    switch (interval) {
      case 'year':
        return annualPlan
      case 'month':
        return monthlyPlan
      case 'quarter':
        return quarterlyPlan
      default:
        return annualPlan
    }
  }

  const [currentInterval] = React.useState<string>(defaultInterval)
  const [currentQuantity, setCurrentQuantity] =
    React.useState<number>(defaultQuantity)

  const [currentPlan, setCurrentPlan] = React.useState<any>(
    pricesForInterval(currentInterval),
  )

  const forTeams: boolean = currentQuantity > 1
  const buttonLabel: string = forTeams ? 'Level Up My Team' : 'Become a Member'

  React.useEffect(() => {
    setCurrentPlan(annualPlan)
    onPriceChanged(annualPlan.stripe_price_id)
  }, [annualPlan])

  return (
    <motion.div
      variants={animationVariants}
      className="bg-white shadow-lg w-full rounded-md px-0"
    >
      <h3 className="text-2xl font-semibold text-center pb-6 border-b border-gray-300 mt-6">
        Become a member
      </h3>
      {currentPlan === annualPlan && <BestValueBanner />}
      <div className="flex flex-col justify-center items-center p-4 md:p-8">
        <span className="w-full text-center font-semibold mx-auto text-lg">
          {currentPlan?.name}
        </span>
        <PlanPrice pricesLoading={pricesLoading} plan={currentPlan} />
        {keys(prices).length > 1 && (
          <div className={quantityAvailable ? '' : 'pb-4'}>
            <PlanIntervalsSwitch
              disabled={false}
              currentPlan={currentPlan}
              setCurrentPlan={(newPlan: any) => {
                setCurrentPlan(newPlan)
                onPriceChanged(newPlan.stripe_price_id)
              }}
              planTypes={individualPlans}
            />
          </div>
        )}

        {quantityAvailable && (
          <div className="py-4">
            <PlanQuantitySelect
              quantity={currentQuantity}
              plan={currentPlan}
              pricesLoading={pricesLoading}
              onQuantityChanged={(quantity: number) => {
                setCurrentQuantity(quantity)
                onQuantityChanged(quantity)
              }}
            />
          </div>
        )}
        <PlanFeatures planFeatures={currentPlan?.features} />
        <form>
          <div className="flex flex-row flex-wrap items-center mt-6">
            <div className="rounded-md relative shadow-sm w-full">
              <div className="absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                className="text-gray-800 autofill:text-fill-white bg-white placeholder-gray-400 focus:ring-indigo-500 focus:border-blue-600 block w-full pl-12 border-gray-300 rounded-md py-4"
                required
              />
            </div>
            <button
              className="mt-2 px-5 py-4 text-center bg-blue-600 text-white font-medium rounded-md w-full hover:bg-blue-700 transition-all duration-300 ease-in-out hover:shadow-md text-lg"
              type="button"
            >
              {buttonLabel}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

function FreeAccountSection() {
  return (
    <motion.div
      variants={animationVariants}
      className="border border-blue-500 shadow-sm rounded-md pb-4 md:pb-8 pt-6
     px-0"
    >
      <h3 className="text-2xl text-white font-semibold text-center pb-6 border-b border-blue-500">
        Create a free account
      </h3>
      <div className="pt-8 px-4 md:px-8">
        <ul className="ml-3">
          <li className="flex text-blue-100 mb-4">
            <CheckIcon className="inline-block flex-shrink-0 w-6 h-6" />
            <span className="ml-4 leading-tight text-lg text-blue-100">
              Access a limited selection of lessons and courses
            </span>
          </li>
          {[
            'Download courses for offline viewing',
            'Closed captions for every video',
            'Commenting and support',
            'Enhanced transcripts',
            'RSS course feeds',
          ].map((item, i) => {
            return (
              <li className="flex text-blue-300 mb-4" key={i}>
                <XIcon className="inline-block flex-shrink-0 w-6 h-6" />
                <span className="ml-4 leading-tight text-lg text-blue-300">
                  {item}
                </span>
              </li>
            )
          })}
        </ul>
        <form>
          <div className="flex flex-row flex-wrap items-center mt-8">
            <div className="rounded-md relative shadow-sm w-full">
              <div className="absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-blue-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                className="text-white autofill:text-fill-white bg-blue-600 placeholder-blue-100 focus:ring-indigo-500 focus:border-blue-200 block w-full pl-12 border-blue-400 rounded-md py-4"
                required
              />
            </div>
            <button
              className="mt-2 px-5 py-4 text-center bg-blue-50 text-blue-700 font-medium rounded-md w-full hover:bg-blue-200 transition-all duration-300 ease-in-out hover:shadow-md text-lg"
              type="button"
            >
              Create a free account
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

const animationVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.3,
    },
  },
}