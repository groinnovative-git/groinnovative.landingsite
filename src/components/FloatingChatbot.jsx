import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bot, MessageCircle, Phone, Send, X } from 'lucide-react'
import './FloatingChatbot.css'

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────────── */

const QUICK_REPLIES = ['Website', 'Software', 'SEO', 'Marketing', 'Quote', 'Contact']

const CONTACT = '+91 93453 06018 / +91 9663 461876'
const WHATSAPP_URL = 'https://wa.me/91 9361304808?text=Hello%20Groinnovative,%20I%20would%20like%20to%20know%20more%20about%20your%20services.'

const INITIAL_MESSAGES = [
    {
        id: 'welcome',
        role: 'bot',
        text: 'Hello! Welcome to Groinnovative 👋\nHow can we help you today?',
    },
]

/* ─────────────────────────────────────────────────────────────────────────────
   KEYWORD LISTS
   Rules:
   - Single-word entries  → matched as whole words only (prevents 'anna' ⊂ 'panna')
   - Multi-word entries   → matched as phrase substrings
───────────────────────────────────────────────────────────────────────────── */

// Greeting — only fire when message has NO other intent
const GREETING_WORDS = new Set([
    'hi', 'hello', 'hey', 'hai', 'hlo', 'hloo', 'hii', 'heyy',
    'gm', 'hru', 'bro', 'anna', 'dai', 'mameh', 'macha',
])
const GREETING_PHRASES = [
    'good morning', 'gud mrng', 'good afternoon', 'good evening',
    'how are you', 'how r u', 'what about you',
]

const CONTACT_KEYWORDS = [
    'contact', 'number', 'call', 'whatsapp',
    'phone number', 'mobile number', 'talk to team', 'connect', 'reach you',
]

// Strong = unambiguous pricing words
const PRICING_STRONG = [
    'cost', 'price', 'package', 'quotation', 'quote', 'rate',
    'budget', 'estimate', 'charges', 'charge', 'amount', 'fee', 'kasu',
    'how much',
]
// Weak = Tanglish "how much" words that can also appear in timeline phrases
//   e.g. "evlo days" → timeline, but "evlo cost" → pricing
const PRICING_WEAK = ['evlo', 'evalo', 'eavlo', 'evloo']
const PRICING_KEYWORDS = [...PRICING_STRONG, ...PRICING_WEAK]

const TIMELINE_KEYWORDS = [
    'days', 'timeline', 'delivery', 'complete', 'urgent', 'fast',
    'evlo naal', 'evlo days', 'eppo mudiyum', 'time aagum',
    'when finish', 'how many days', 'delivery time',
]

// Each service: { id, keywords[] }
const SERVICES = [
    {
        id: 'website',
        keywords: [
            'website', 'site', 'webpage', 'ecommerce', 'portfolio',
            'responsive', 'domain', 'hosting',
            'web site', 'web page', 'landing page', 'business website',
            'company website', 'ecommerce website', 'portfolio website',
        ],
    },
    {
        id: 'software',
        keywords: [
            'software', 'app', 'application', 'dashboard', 'crm', 'erp',
            'portal', 'automation', 'billing',
            'web app', 'mobile app', 'admin panel', 'booking system',
            'management system', 'custom software',
        ],
    },
    {
        id: 'seo',
        keywords: [
            'seo', 'ranking', 'keyword', 'traffic', 'indexing', 'sitemap',
            'google rank', 'google search', 'local seo', 'technical seo',
            'first page', 'keyword ranking', 'website traffic',
        ],
    },
    {
        id: 'marketing',
        keywords: [
            'marketing', 'ads', 'leads', 'promotion', 'campaign',
            'digital marketing', 'google ads', 'facebook ads',
            'instagram ads', 'meta ads', 'social media', 'lead generation',
        ],
    },
    {
        id: 'maintenance',
        keywords: [
            'maintenance', 'maintain', 'update', 'bug', 'backup',
            'security', 'speed', 'slow', 'support', 'error',
            'bug fix', 'hosting issue', 'website issue', 'monthly support',
        ],
    },
    {
        id: 'branding',
        keywords: [
            'logo', 'poster', 'banner', 'branding', 'brand',
            'creative', 'flyer', 'brochure', 'design',
            'social media poster', 'visiting card', 'business card',
            'logo design', 'poster design',
        ],
    },
]

const IRRELEVANT_KEYWORDS = [
    'politics', 'movie', 'cinema', 'cricket', 'medical', 'doctor',
    'hospital', 'election', 'astrology', 'jathagam', 'relationship',
    'love', 'song',
]

/* ─────────────────────────────────────────────────────────────────────────────
   RESPONSES
───────────────────────────────────────────────────────────────────────────── */

const PRICING_RESPONSES = {
    website:     `Website creation cost depends on the number of pages, design style, features, domain/hosting needs, forms, payment gateway, and content. Please contact ${CONTACT} for a clear website quotation.`,
    software:    `Software development cost depends on modules, user roles, dashboard features, database, automation, integrations, and project complexity. Please contact ${CONTACT} to discuss your requirement and get a quotation.`,
    seo:         `SEO pricing depends on your website condition, target keywords, competition, local/global targeting, and monthly optimization needs. Please contact ${CONTACT} for an SEO package discussion.`,
    marketing:   `Digital marketing cost depends on campaign type, ad budget, platform, creatives, landing page, and lead generation goals. Please contact ${CONTACT} for campaign planning and pricing.`,
    maintenance: `WebWebsite Maintenance cost depends on update frequency, bug fixes, backup, security checks, speed optimization, and monthly support needs. Please contact ${CONTACT} for maintenance pricing.`,
    branding:    `Logo and poster design cost depends on the design requirement, number of concepts, revisions, branding needs, and final deliverables. Please contact ${CONTACT} for the exact design quotation.`,
}

const TIMELINE_RESPONSES = {
    website:     `Website delivery time depends on pages, content, design level, and features. Simple websites can be completed faster, while ecommerce or custom websites may take more time. Please contact ${CONTACT} for the exact timeline.`,
    software:    `Software development timeline depends on modules, features, user roles, database, and integrations. Please contact ${CONTACT} to discuss the project scope and timeline.`,
    seo:         `SEO is a continuous process. Results depend on competition, keywords, website quality, and optimization consistency. Please contact ${CONTACT} for an SEO plan discussion.`,
    marketing:   `Digital marketing timeline depends on campaign goals, platforms, creatives, and lead generation strategy. Please contact ${CONTACT} for campaign planning.`,
    maintenance: `Maintenance support timeline depends on the issue type, update request, bug severity, and website condition. Please contact ${CONTACT} for support.`,
    branding:    `Logo and poster design timeline depends on the number of designs, concepts, revisions, and branding requirements. Please contact ${CONTACT} for the exact timeline.`,
}

const SERVICE_RESPONSES = {
    website:     `Yes, Groinnovative can help you create a professional and responsive website for your business. We handle design, development, domain, hosting, and content. Please contact ${CONTACT} for a clear quotation.`,
    software:    `Yes, we build custom software, admin panels, dashboards, portals, and business applications based on your requirement. Please contact ${CONTACT} to discuss your project.`,
    seo:         `Yes, Groinnovative provides SEO optimization to improve your website's visibility, keyword ranking, and search performance. We do not give fake ranking guarantees. Please contact ${CONTACT} for SEO discussion.`,
    marketing:   `Yes, we help with digital marketing, lead generation, ad campaigns, social media promotion, and online business growth. Please contact ${CONTACT} for campaign planning.`,
    maintenance: `Yes, we provide Website Maintenance including website updates, bug fixes, speed improvement, backup, and security checks. Please contact ${CONTACT} for maintenance support.`,
    branding:    `Yes, Groinnovative provides logo, poster, banner, social media creative, flyer, brochure, and branding design services. Please contact ${CONTACT} for your design requirement.`,
}

/* ─────────────────────────────────────────────────────────────────────────────
   INTENT HELPERS
───────────────────────────────────────────────────────────────────────────── */

/**
 * Lowercase, collapse whitespace, remove non-word characters (except spaces).
 * Result is a clean space-separated token string — safe for whole-word matching.
 */
function normalizeMessage(raw) {
    return raw
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * Whole-word match for single-word keywords, substring match for phrases.
 * This prevents false positives like 'anna' matching inside 'panna'.
 */
function matchesKeyword(message, keyword) {
    if (keyword.includes(' ')) {
        // Multi-word phrase → substring
        return message.includes(keyword)
    }
    // Single word → exact token match (message is already space-normalised)
    return message.split(' ').includes(keyword)
}

function hasAny(message, keywords) {
    return keywords.some(k => matchesKeyword(message, k))
}

/** Returns the best-scoring service id, or null. */
function detectServiceIntent(message) {
    const scored = SERVICES.map(({ id, keywords }) => ({
        id,
        score: keywords.reduce((n, k) => n + (matchesKeyword(message, k) ? 1 : 0), 0),
    }))
    const best = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score)
    return best[0]?.id ?? null
}

function detectPricingIntent(message) {
    return hasAny(message, PRICING_KEYWORDS)
}

// Only strong, unambiguous pricing words — excludes 'evlo'/'evalo' etc.
// Used to resolve service+pricing vs service+timeline conflicts:
//   "evlo days website" → weak pricing + timeline → treat as timeline
//   "website cost evlo" → strong pricing + timeline → treat as pricing
function detectStrongPricingIntent(message) {
    return hasAny(message, PRICING_STRONG)
}

function detectTimelineIntent(message) {
    return hasAny(message, TIMELINE_KEYWORDS)
}

function detectContactIntent(message) {
    return hasAny(message, CONTACT_KEYWORDS)
}

/**
 * Returns true ONLY when the message contains greeting signals AND has no
 * service, pricing, timeline, or contact intent — preventing false fires.
 */
function detectGreetingOnly(message) {
    if (
        detectServiceIntent(message) ||
        detectPricingIntent(message) ||
        detectTimelineIntent(message) ||
        detectContactIntent(message)
    ) return false

    if (GREETING_PHRASES.some(p => message.includes(p))) return true
    return message.split(' ').some(w => GREETING_WORDS.has(w))
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN RESPONSE FUNCTION
   Priority:
     1. Contact intent
     2. Service + Pricing
     3. Service + Timeline
     4. Service only
     5. Pricing only
     6. Timeline only
     7. Greeting only
     8. Irrelevant
     9. Unknown fallback
───────────────────────────────────────────────────────────────────────────── */

function getBotReply(rawMessage) {
    const message = normalizeMessage(rawMessage)

    if (!message) {
        return `Hi! How can we help you? Please share your requirement.`
    }

    const service    = detectServiceIntent(message)
    const hasPricing = detectPricingIntent(message)
    const hasTime    = detectTimelineIntent(message)

    // 1. Contact
    if (detectContactIntent(message)) {
        return `You can contact Groinnovative at:\n${CONTACT}\n\nCall or WhatsApp us for website, software, SEO, digital marketing, maintenance, logo, and poster design enquiries.`
    }

    const hasStrongPricing = detectStrongPricingIntent(message)

    // 2. Service + Pricing (strong signal wins over timeline)
    if (service && hasStrongPricing) return PRICING_RESPONSES[service]

    // 3. Service + Timeline (also catches weak-pricing + timeline, e.g. "evlo days website")
    if (service && hasTime) return TIMELINE_RESPONSES[service]

    // 2b. Service + weak pricing only (no timeline ambiguity)
    if (service && hasPricing) return PRICING_RESPONSES[service]

    // 4. Service only
    if (service) return SERVICE_RESPONSES[service]

    // 5. Pricing only (no service detected)
    if (hasPricing) {
        return `Pricing depends on the service and your exact requirement. We provide website creation, software development, SEO, digital marketing, maintenance, logo, and poster design. Please contact ${CONTACT} for the correct quotation.`
    }

    // 6. Timeline only
    if (hasTime) {
        return `Timeline depends on the service and project scope. Simple websites are faster; complex software takes more time. Please contact ${CONTACT} for an exact timeline.`
    }

    // 7. Greeting only
    if (detectGreetingOnly(message)) {
        return `Hey there! 👋 How can we help you today? Tap a quick option below or type your question.`
    }

    // 8. Irrelevant topic
    if (hasAny(message, IRRELEVANT_KEYWORDS)) {
        return `I can help you with Groinnovative services like website creation, software development, SEO, digital marketing, Website Maintenance, logo, and poster design. For direct support, please contact ${CONTACT}.`
    }

    // 9. Unknown fallback
    return `Thanks for reaching out! We can help with website creation, software development, SEO, digital marketing, Website Maintenance, logo, and poster design. Please contact ${CONTACT} for direct support.`
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function FloatingChatbot({ isOpen, setIsOpen }) {
    const navigate = useNavigate()
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isOpen, isTyping])

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('chatbot-open')
            document.documentElement.classList.add('chatbot-open')
        } else {
            document.body.classList.remove('chatbot-open')
            document.documentElement.classList.remove('chatbot-open')
        }
        return () => {
            document.body.classList.remove('chatbot-open')
            document.documentElement.classList.remove('chatbot-open')
        }
    }, [isOpen])

    const pushMessage = (role, text) => {
        setMessages((prev) => [
            ...prev,
            {
                id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                role,
                text,
            },
        ])
    }

    const submitUserMessage = (intentText, displayText) => {
        const intent = intentText.trim()
        if (!intent || isTyping) return

        pushMessage('user', displayText || intent)
        setInputValue('')
        setIsTyping(true)

        setTimeout(() => {
            setIsTyping(false)
            pushMessage('bot', getBotReply(intent))
        }, 850)
    }

    const handleQuickReply = (label) => {
        const quickReplyConfig = {
            Website:   { display: 'I need a Website',             intent: 'website venum' },
            Software:  { display: 'Software Development inquiry', intent: 'software venum' },
            SEO:       { display: 'Tell me about SEO',            intent: 'seo help venum' },
            Marketing: { display: 'Digital Marketing inquiry',    intent: 'digital marketing venum' },
            Quote:     { display: 'I need a Quote',               intent: 'quote venum' },
            Contact:   { display: 'Share Contact Details',        intent: 'contact number venum' },
        }
        const config = quickReplyConfig[label]
        if (config) submitUserMessage(config.intent, config.display)
        else submitUserMessage(label)
    }

    const handleNavigate = (path, userText, botText) => {
        pushMessage('user', userText)
        setTimeout(() => pushMessage('bot', botText), 600)
        navigate(path)
        setIsOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        submitUserMessage(inputValue)
    }

    return (
        <>
            {/* Backdrop overlay */}
            <div 
                className={`chatbot-backdrop${isOpen ? ' chatbot-backdrop--open' : ''}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            <div className={`chatbot-widget${isOpen ? ' chatbot-widget--open' : ''}`}>
                <div className="chatbot-window" role="dialog" aria-label="Groinnovative chatbot">

                {/* Header */}
                <div className="chatbot-header">
                    <div className="chatbot-avatar">
                        <Bot size={18} />
                    </div>
                    <div className="chatbot-header-info">
                        <span className="chatbot-title">Groinnovative Assistant</span>
                        <span className="chatbot-subtitle">
                            <span className="chatbot-status-dot" />
                            Online · We usually reply instantly
                        </span>
                    </div>
                    <button
                        type="button"
                        className="chatbot-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chatbot"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Messages */}
                <div className="chatbot-body">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chatbot-message chatbot-message--${message.role}`}
                        >
                            {message.text.split('\n').map((line, index) => (
                                <span key={`${message.id}-${index}`} className="chatbot-line">
                                    {line}
                                </span>
                            ))}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chatbot-message chatbot-message--bot chatbot-typing">
                            <span />
                            <span />
                            <span />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="chatbot-quick-replies">
                    {QUICK_REPLIES.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="chatbot-quick-btn"
                            onClick={() => handleQuickReply(item)}
                            disabled={isTyping}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <form className="chatbot-input-area" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        className="chatbot-input"
                        placeholder="Type your message..."
                        aria-label="Type your message"
                        disabled={isTyping}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="chatbot-send-button"
                        aria-label="Send message"
                        disabled={isTyping || !inputValue.trim()}
                    >
                        <Send size={15} />
                    </button>
                </form>

                {/* Footer Actions */}
                <div className="chatbot-footer-actions">
                    <button
                        type="button"
                        className="chatbot-action-chip"
                        onClick={() =>
                            handleNavigate(
                                '/services',
                                'services page open pannunga',
                                'Opening the Services page. You can check Website Creation, Software Development, SEO, Digital Marketing, Website Maintenance, and Logo & Poster Creation there.'
                            )
                        }
                    >
                        <Send size={13} />
                        <span>Services</span>
                    </button>
                    <Link
                        to="/contact"
                        className="chatbot-action-chip"
                        onClick={() => setIsOpen(false)}
                    >
                        <MessageCircle size={13} />
                        <span>Contact</span>
                    </Link>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chatbot-action-chip"
                    >
                        <Phone size={13} />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}
