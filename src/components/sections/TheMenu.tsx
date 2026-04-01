'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mobileReveal, isTouchDevice } from '@/lib/mobileReveal'

gsap.registerPlugin(ScrollTrigger)

interface MenuItem {
  name: string
  price: string
  description: string
  cs?: boolean
  note?: string
}

const MENU: Record<string, MenuItem[]> = {
  'Tandoori & Apps': [
    { name: 'Black Garlic Infused Chicken Tikka', price: '$16.99', cs: true, description: 'Marinated in fermented garlic-based masala and grilled to perfection in tandoor. Served with beet-radish tartare, lemon masala gel, and classic mint chutney' },
    { name: 'Afghani Anar Tikka', price: '$16.99', cs: true, description: 'Succulent pieces of chicken marinated in pomegranate-based marinade and grilled to perfection in tandoor' },
    { name: 'Murg Lajawab', price: '$17.99', description: 'A regal North Indian delight from the royal kitchens, featuring marinated chicken pieces in a velvety gravy of cashew paste, fresh cream, and a symphony of Indian spices' },
    { name: 'Tandoori Murg', price: '$14.99', description: 'Chicken cooked in clay oven with secret herbs & spices in yogurt' },
    { name: 'Tandoor Murg Tikka', price: '$14.99', description: 'Boneless chicken cooked in clay oven with secret herbs & spices in yogurt' },
    { name: 'Reshmi Fish Tikka', price: '$15.99', description: 'Fish tikka marinated with yogurt, gram flour and secret masalas, cooked in clay oven' },
    { name: 'Amritsari Fried Fish', price: '$12.99', description: 'Authentic Punjabi style deep fried fish with secret family owned recipe' },
    { name: 'Chicken Peri Peri Tikka', price: '$15.99', description: 'Boneless juicy chicken marinated in a spicy peri peri sauce' },
    { name: 'Chicken Achaari Tikka', price: '$15.99', description: 'Authentic Indian spicy marinated boneless chicken cooked in clay oven' },
    { name: 'Chicken Malai Tikka', price: '$16.99', description: 'Marinated boneless chicken in creamy cheese & nuts with light spices, cooked in clay oven' },
    { name: 'Chicken Seekh Kebab', price: '$16.99', description: 'Minced chicken cooked on skewers with chillies, ginger, garlic & Indian spices' },
    { name: 'Haryali Chicken', price: '$15.99', description: 'Juicy chicken in a vibrant, fresh herb & spice marinade of mint, cilantro, and green chilies' },
    { name: 'Non Veg Platter', price: '$20.99', description: 'A platter of assorted chicken tikkas and sheesh kabab' },
  ],
  'Veg Appetizers': [
    { name: 'Tandoori Avocado', price: '$12.99', cs: true, description: 'Marinated in tandoori masala, stuffed with goat cheese, cranberry and raisins. Served on chilli pineapple sauce' },
    { name: 'Triple M (Malai Masala Manchurian)', price: '$14.99', cs: true, description: 'Crispy fried vegetable balls tossed in a rich, creamy, aromatic tomato-based malai masala sauce' },
    { name: 'Paneer Tikka', price: '$14.99', description: 'Marinated paneer cooked in clay oven with secret herbs in yogurt' },
    { name: 'Paneer Malai Tikka', price: '$14.99', description: 'Marinated paneer in creamy yogurt with light spices, cooked in clay oven' },
    { name: 'Paneer Achaari Tikka', price: '$14.99', description: 'Authentic Indian spicy marinated paneer, cooked in clay oven' },
    { name: 'Paneer Tikka Peri Peri', price: '$14.99', description: 'Paneer cooked in clay oven with peri peri sauce & secret spices' },
    { name: 'Paneer Tikka Platter', price: '$17.99', description: 'Assorted paneer tikka cooked in clay oven' },
    { name: 'Paneer Pakora', price: '$10.99', description: 'Slices of fresh paneer marinated with herbs, dipped in a light, crispy chickpea flour batter' },
    { name: 'Vegetable Pakora', price: '$8.99', description: 'Fresh vegetables blended in a fragrant chickpea flour batter with traditional Indian spices' },
    { name: 'Hara Bhara Kebab', price: '$11.99', description: 'Vibrant green patties made from spiced spinach, green peas, and potatoes' },
    { name: 'Samosa Plate', price: '$9.99', description: 'Two deep-fried, flaky pastry pyramids stuffed with potatoes, peas, and traditional spices' },
    { name: 'Cheese Corn Roll', price: '$10.99', description: 'Sweet corn kernels and rich melted cheese, seasoned with herbs and spices, in a fried shell' },
    { name: 'Veg Appetizer Platter', price: '$13.99', description: 'A combination of 3 veg pakoras, 3 paneer pakoras, 2 samosas and 3 hara bhara kebab' },
    { name: 'Tandoori Soya Chaap', price: '$12.99', description: 'Soya chaap marinated in a robust blend of spices, slow cooked in traditional clay oven' },
    { name: 'Soya Malai Chaap', price: '$13.99', description: 'Tender soya chaap in a creamy, rich blend of malai & aromatic spices' },
    { name: 'Haryali Soya Chaap', price: '$13.99', description: 'Tender soya protein chunks in a rich herbaceous marinade of mint, cilantro, and green chilies' },
    { name: 'Soya Chaap Peri Peri', price: '$13.99', description: 'Soya chaap marinated in a zesty, spicy peri peri sauce' },
  ],
  'Hakka Chinese': [
    { name: 'Chilli Chicken', price: '$15.99', description: 'Crispy chicken pieces stir fried with peppers, onions, ginger, garlic & spicy tangy sauce' },
    { name: 'Honey Garlic Chicken', price: '$15.99', description: 'Boneless chicken cooked in sauce made with honey, garlic & chillies' },
    { name: 'Manchurian Chicken', price: '$15.99', description: 'Deep-fried chicken in tangy manchurian sauce with bell peppers and onions' },
    { name: 'Chilli Paneer', price: '$14.99', description: 'Crispy paneer cubes stir fried with peppers, onions, ginger, garlic & spicy tangy sauce' },
    { name: 'Honey Chilli Potatoes', price: '$11.99', description: 'Crispy potatoes coated in a sweet & spicy sauce with a hint of honey' },
    { name: 'Veg Manchurian', price: '$13.99', description: 'Crispy vegetable balls simmered in tangy savory sauce' },
    { name: 'Gobhi Manchurian', price: '$14.99', description: 'Crispy cauliflower florets tossed in a tangy savory manchurian sauce' },
    { name: 'Mushroom Chilli', price: '$12.99', description: 'Crispy stir fried mushrooms tossed with capsicums, onions & chilli sauce' },
    { name: 'Chilli Fish', price: '$13.99', description: 'Crispy fish tossed with peppers, onions, ginger, garlic & in house sauces' },
    { name: 'Honey Garlic Prawn', price: '$15.99', description: 'Succulent seared prawns tossed in sticky sweet savory honey garlic sauce' },
    { name: 'Veg Hakka Noodles', price: '$13.99', description: 'Sauteed veggies & chowmein blended in home made sauce' },
    { name: 'Chicken Tikka Noodles', price: '$15.99', description: 'Sauteed chicken, veggies & noodles blended in home made sauce' },
    { name: 'Chicken Noodles', price: '$14.99', description: 'Tender chicken and crisp vegetables tossed with savory noodles in soy-based sauce' },
    { name: 'Schezwan Noodles', price: '$14.99', description: 'Sauteed veggies & chowmein blended with schezwan sauce' },
    { name: 'Vegetable Fried Rice', price: '$13.99', description: 'Basmati rice with finely chopped vegetables and green chili sauce' },
    { name: 'Chicken Fried Rice', price: '$14.99', description: 'Tender chicken, fresh carrots, peas, and scrambled egg with stir-fried rice' },
    { name: 'Veg Spring Roll', price: '$7.99', description: 'Crispy golden spring rolls stuffed with fresh vegetables' },
    { name: 'Noodles Spring Roll', price: '$9.99', description: 'Spring roll wrapped with noodles' },
  ],
  'Momos': [
    { name: 'Veg Steamed Momos', price: '$12.99', description: 'Steamed dumplings stuffed with minced vegetables and spices, served with spicy dipping sauce' },
    { name: 'Steamed Chicken Momos', price: '$13.99', description: 'Steamed dumplings filled with minced chicken, served with spicy dipping sauce' },
    { name: 'Veg Chilli Momos', price: '$13.99', description: 'Pan fried veg momos tossed in savoury sauce with coloured peppers, onions & chillies' },
    { name: 'Chicken Chilli Momos', price: '$14.99', description: 'Pan fried dumplings filled with minced chicken tossed with peppers, onions, chilli sauce' },
    { name: 'Veg Afghani Momos', price: '$14.99', description: 'Veg dumplings tossed in a creamy afghani sauce, infused with mild spices and rich flavours' },
    { name: 'Chicken Afghani Momos', price: '$15.99', description: 'Chicken momos tossed in a creamy afghani sauce, infused with mild spices and rich flavours' },
    { name: 'Veg Pan Fried Momos', price: '$12.99', description: 'Marinated with tandoori spices, grilled to perfection for a smoky flavorful twist' },
    { name: 'Chicken Pan Fried Momos', price: '$13.99', description: 'Marinated with tandoori spices, grilled to perfection for a smoky flavorful twist' },
  ],
  'Entrees': [
    { name: 'Butter Chicken', price: '$18.99', description: 'Tandoor-roasted chicken in a velvety tomato and butter gravy' },
    { name: 'Butter Chicken Ludhiana Style', price: '$23.99', cs: true, description: 'Succulent bone-in chicken in tomato-based yellow gravy, from the roots of Punjab' },
    { name: 'Chicken Chettinad', price: '$23.99', cs: true, description: 'Bone-in chicken in house-made Chettinad masala finished with coconut milk. Served with Malabar Parantha' },
    { name: 'Kadhai Chicken', price: '$18.99', description: 'Chicken in secret gravy with tomatoes, onions, capsicum & hand made spices' },
    { name: 'Dhaba Style Chicken Curry', price: '$18.99', description: 'Classic rustic dhaba chicken curry with aromatic spices' },
    { name: 'Tawa Chicken', price: '$19.99', description: 'Chicken tikka cooked with gravy of onions, tomatoes, ginger, garlic, green chillies & spices' },
    { name: 'Murg Kali Mirch', price: '$18.99', description: 'Boneless chicken in a velvety spice-infused white sauce' },
    { name: 'Murg Masalam (Pre Order 24hrs)', price: '$29.99', cs: true, description: 'Decadent slow-cooked whole chicken marinated in yogurt and aromatic spices' },
    { name: 'Goat Curry', price: '$21.99', description: 'Goat meat slowly cooked in a rich spiced gravy' },
    { name: 'Makhmali Goat Curry', price: '$21.99', cs: true, description: 'Goat pieces cooked in cream and home made gravy' },
    { name: 'Lamb Roganjosh', price: '$21.99', description: 'Succulent lamb slow-cooked in deeply aromatic gravy with ginger, garlic, and warm spices' },
    { name: 'Raan-E-Shaan (Pre Order 24hrs)', price: '$59.99', cs: true, description: 'Spectacular whole slow-roasted leg of mutton, marinated in fragrant spices' },
    { name: 'Prawn Pineapple Curry', price: '$21.99', description: 'Juicy prawns and caramelized pineapple in luscious spice-infused coconut milk sauce' },
    { name: 'Paneer Lababdar', price: '$18.99', cs: true, description: 'Paneer dipped in a rich, bold sauce of onions, tomatoes, and cream' },
    { name: 'Palak Chenna', price: '$19.99', cs: true, description: 'Fresh chenna stuffed with dry fruits and khoya served with spinach based gravy' },
    { name: 'Paneer Tikka Masala', price: '$17.99', description: 'Smoky grilled paneer in a luscious tangy creamy tomato gravy' },
    { name: 'Paneer Butter Masala', price: '$17.99', description: 'Cottage cheese cooked with tomatoes, onions & capsicum in secret gravy' },
    { name: 'Shahi Paneer', price: '$17.99', description: 'Paneer in a rich creamy gravy made with tomatoes & butter' },
    { name: 'Kadhai Paneer', price: '$17.99', description: 'Soft paneer tossed in a bold aromatic tomato-onion masala in a traditional kadhai' },
    { name: 'Matar Paneer', price: '$16.99', description: 'Soft paneer and green peas simmered in a spiced tomato and onion gravy' },
    { name: 'Paneer Methi Malai', price: '$17.99', description: 'Paneer & fenugreek cooked in mild flavorful gravy' },
    { name: 'Paneer Bhurji', price: '$18.99', description: 'Crumbled paneer, onions, tomatoes, and a savory blend of Indian spices' },
    { name: 'Makhmali Malai Kofta', price: '$16.99', description: 'Veggie & paneer stuffed balls cooked in creamy gravy' },
    { name: 'Navratan Korma', price: '$17.99', description: 'Royal Mughlai curry with nine gems \u2014 vegetables and paneer in creamy mildly spiced white sauce' },
    { name: 'Dal Makhani', price: '$14.99', description: 'Slow cooked black lentils in a creamy, buttery tomato sauce' },
    { name: 'Dal Tadka', price: '$13.99', description: 'Yellow split lentil cooked & tempered with tomatoes, onions, ginger, garlic & green chillies' },
    { name: 'Dal Haandi', price: '$14.99', description: 'Flavorful lentil dish simmered with onions, tomatoes, ginger, and garlic' },
    { name: 'Aloo Gobhi', price: '$13.99', description: 'Tender potatoes & cauliflower cooked with spices, tomatoes & herbs' },
    { name: 'Baingan Bharta', price: '$13.99', description: 'Clay oven roasted eggplant cooked with onions, tomatoes, Kashmiri chillies, garlic & ginger' },
    { name: 'Mushroom Do Pyaza', price: '$15.99', description: 'Juicy mushrooms sauteed with double the onions in a flavorful gravy' },
    { name: 'Palak Mushroom', price: '$16.99', description: 'Mushrooms sauteed & cooked in a flavorful spinach gravy' },
    { name: 'Soya Chaap Makhani', price: '$15.99', description: 'Tender soya chaap simmered in a velvety buttery tomato sauce' },
    { name: 'Mix Veg', price: '$14.99', description: 'Seasonal veggies cooked with onions, tomatoes & spices' },
    { name: 'Chana Masala', price: '$14.99', description: 'Chickpeas simmered in a vibrant spiced tomato and onion gravy' },
  ],
  'Biryani': [
    { name: 'Murg Dum Biryani', price: '$17.99', cs: true, description: 'Authentic dum biryani inspired by Paradise Biryani House in Hyderabad. Raw chicken cooked with rice using ancient dumpukht technique' },
    { name: 'Jackfruit Dum Biryani', price: '$15.99', cs: true, description: 'Jackfruit cooked with rice using ancient dumpukht technique' },
    { name: 'Deluxe Biryani', price: '$19.99', description: 'Fragrant long-grain basmati rice layered with tender marinated meat, infused with saffron' },
    { name: 'Vegetable Biryani', price: '$14.99', description: 'Aromatic basmati rice layered with fresh seasonal vegetables, fragrant spices, saffron, and herbs' },
    { name: 'Lamb Biryani', price: '$17.99', description: 'Fragrant basmati rice with tender slow-cooked lamb marinated in yogurt and aromatic spices' },
    { name: 'Goat Biryani', price: '$17.99', description: 'Fragrant basmati rice with tender slow-cooked goat marinated in yogurt and aromatic spices' },
  ],
  'Chaats': [
    { name: 'Aloo Tikki Stuffed Chaat', price: '$12.99', cs: true, description: 'Golden-fried potato patties stuffed with goat cheese and cranberries, smothered in chickpea curry, sweet yogurt, and signature chutneys' },
    { name: 'Palak Patta Chaat', price: '$11.99', cs: true, description: 'Chickpea-battered spinach fritters drizzled with sweet date-tamarind and spicy coriander-mint chutneys' },
    { name: 'Pani Puri', price: '$8.99', description: 'Hollow crispy flour balls filled with boiled potatoes, chickpeas, onions, and tangy-spicy tamarind water' },
    { name: 'Dahi Pani Puri', price: '$10.99', description: 'Crispy puris filled with spiced potatoes, chickpeas, yogurt, sweet & spicy chutneys' },
    { name: 'Dahi Bhalla', price: '$9.99', description: 'Soft lentil dumplings in creamy yogurt, topped with tamarind & mint chutneys' },
    { name: 'Chaat Papdi', price: '$8.99', description: 'Crisp papdi, spiced potatoes, chickpeas, cool yogurt, sweet tamarind, and zesty green chutney' },
    { name: 'Bombay Chaat', price: '$10.99', description: 'Crispy papdi, spiced potatoes, refreshing yogurt, sweet & spicy chutneys, and crunchy sev' },
  ],
  'Breads': [
    { name: 'Butter Naan', price: '$2.49', description: 'Soft butter naan baked in clay oven' },
    { name: 'Garlic Naan', price: '$2.99', description: 'Classic garlic naan from the tandoor' },
    { name: 'Cheese Naan', price: '$4.99', description: 'Naan stuffed with melted cheese' },
    { name: 'Tandoori Roti', price: '$2.49', description: 'Traditional whole wheat roti baked in tandoor' },
    { name: 'Lacha Paratha', price: '$3.49', description: 'Flaky layered whole wheat paratha' },
    { name: 'Assorted Breads', price: '$13.99', description: 'Selection of assorted breads from the tandoor' },
  ],
  'Desserts': [
    { name: 'Paan Ki Kahaani', price: '$11.99', cs: true, description: 'In-house paan ice cream stuffed with gulkand, served with chocolate chikki and coconut pearls' },
    { name: 'Gajrella Momos', price: '$10.99', description: 'Creative fusion: crispy baked dumplings filled with gajar halwa served on classic rabri' },
    { name: 'Gulab Jamun Cheesecake', price: '$9.99', description: 'Fried flour balls soaked in sugar syrup combined with cream cheese' },
    { name: 'Moti Choor Cheesecake', price: '$9.99', description: 'No-bake Indian-fusion dessert combining creamy cheesecake with cardamom-scented motichoor ladoo' },
    { name: 'Banoffee Pie', price: '$9.99', description: 'Bananas, whipped cream, and thick caramel sauce combined on powdered biscuits' },
  ],
  'Drinks': [
    { name: 'Masala Chai', price: '$4.99', description: 'Spiced Indian tea with milk' },
    { name: 'Mango Mastani', price: '$5.99', description: 'Refreshing mango-based drink' },
    { name: 'Sweet Lassi', price: '$5.99', description: 'Classic sweet yogurt drink' },
    { name: 'Salted Lassi', price: '$5.99', description: 'Traditional salted yogurt drink' },
    { name: 'Soft Drink', price: '$2.49', description: 'Assorted soft drinks' },
    { name: 'Soft Drink (Imported)', price: '$3.49', description: 'Premium imported soft drinks' },
    { name: 'Juice', price: '$2.49', description: 'Fresh juice selection' },
  ],
}

const TABS = Object.keys(MENU)

export default function TheMenu() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const isTouch = isTouchDevice()

    if (isTouch) {
      const menuEls = headingRef.current
        ? Array.from(headingRef.current.querySelectorAll('.menu-reveal'))
        : []
      return mobileReveal([...menuEls, tabsRef.current], { stagger: 0.1 })
    }

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const els = headingRef.current.querySelectorAll('.menu-reveal')
        gsap.fromTo(
          els,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const items = MENU[activeTab]

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="light-section relative overflow-hidden bg-cream py-32 lg:py-40"
    >
      {/* Topographic circle pattern */}
      <div className="topo-pattern" />

      {/* Section heading */}
      <div ref={headingRef} className="relative z-10 px-6 text-center lg:px-16">
        <span
          className="menu-reveal inline-block font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.25em] text-gold"
          style={{ opacity: 0 }}
        >
          Our Menu
        </span>
        <h2
          className="menu-reveal mx-auto mt-6 max-w-[800px] font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-tight text-forest"
          style={{ opacity: 0 }}
        >
          The Full{' '}
          <em className="italic text-gold">Kahaani</em>
        </h2>
        <p
          className="menu-reveal mx-auto mt-5 max-w-[420px] font-[family-name:var(--font-dm-sans)] text-[13px] leading-[1.8] text-forest/50"
          style={{ opacity: 0 }}
        >
          East Indian classics, Hakka wok specials, and tandoor signatures{' '}
          <em className="font-[family-name:var(--font-cormorant)] text-[15px] italic text-forest/60">&mdash; all under one roof</em>.
        </p>
      </div>

      {/* Tab navigation */}
      <div
        ref={tabsRef}
        style={{ opacity: 0 }}
        className="relative z-10 mx-auto mt-14 max-w-[1200px] border-t border-forest/10 px-6 lg:px-16"
      >
        <div className="overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex min-w-max gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative whitespace-nowrap px-5 py-4 font-[family-name:var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300"
                style={{
                  color: activeTab === tab ? '#B8935A' : 'rgba(44,62,53,0.4)',
                }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="menu-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items grid */}
      <div className="relative z-10 mx-auto mt-10 max-w-[1200px] px-6 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.03,
                }}
                className="group relative border-b border-forest/5 p-6 transition-colors duration-500 hover:bg-forest/[0.02]"
              >
                {/* CS badge */}
                {item.cs && (
                  <span className="absolute right-5 top-5 border border-gold/40 px-2 py-0.5 font-[family-name:var(--font-dm-sans)] text-[9px] font-medium uppercase tracking-[0.15em] text-gold">
                    Chef&apos;s Pick
                  </span>
                )}

                <div className="flex items-start justify-between gap-4">
                  <h4 className="pr-16 font-[family-name:var(--font-cormorant)] text-lg font-normal leading-tight text-forest transition-colors duration-300 group-hover:text-gold">
                    {item.name}
                  </h4>
                </div>

                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-xl italic text-gold">
                  {item.price}
                </p>

                <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-[12px] leading-[1.7] text-forest/40">
                  {item.description}
                </p>

                {/* Subtle gold line accent on hover */}
                <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/30 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Halal note */}
        {activeTab === 'Tandoori & Apps' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center font-[family-name:var(--font-dm-sans)] text-[11px] tracking-wide text-forest/30"
          >
            All chicken dishes available in <span className="text-gold">Halal</span> &mdash; add $2
          </motion.p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="mx-auto mt-20 h-px max-w-[200px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  )
}
