# Design System Inspired by Stripe

## 1. Visual Theme & Atmosphere

The Stripe design system embodies a professional, developer-focused aesthetic rooted in clarity and precision. It balances minimalist principles with functional depth, creating an environment where technical documentation feels approachable yet authoritative. The color palette leans toward cool, corporate grays paired with a vibrant blue accent, evoking trust and innovation. The typography system prioritizes readability across varying contexts—from dense code snippets to marketing headlines—reflecting Stripe's dual role as both a payments infrastructure provider and a marketing-driven platform. Subtle shadows and generous whitespace create visual hierarchy without overwhelming the user, while the carefully calibrated neutral scale ensures legibility across light backgrounds. The overall impression is one of polished professionalism: a system that communicates competence, security, and developer empowerment.

**Key Characteristics**

- Clean, minimalist aesthetic with generous whitespace
- Cool corporate color palette (blues, grays, whites)
- Developer-friendly typography supporting both prose and code
- Subtle depth through precise shadow treatments
- Strong visual hierarchy through color and weight contrast
- Professional tone balanced with approachability
- Trust-building through consistent, predictable patterns

## 2. Color Palette & Roles

### Primary

- **Primary Blue** (`#5469D4`): Core action color for primary CTAs, links, and interactive elements; establishes brand identity
- **Dark Blue** (`#533AFD`): Accent variant for hover states and elevated emphasis on actions
- **Primary Text** (`#414552`): Primary body text, labels, and general content; used 329 times across the system

### Accent Colors

- **Success Green** (`#85D996`): Positive confirmations, success messages, and completed states
- **Slate Gray** (`#697386`): Secondary emphasis text and secondary headings

### Interactive

- **Link Blue** (`#5469D4`): Standard link color matching primary blue
- **Deep Slate** (`#3C4F69`): Deep interactive element backgrounds and navigation accents
- **Muted Blue** (`#50617A`): Medium-emphasis text and secondary action text

### Neutral Scale

- **White** (`#FFFFFF`): Primary background and surface color; used 339 times
- **Very Light Blue** (`#F5FBFF`): Subtle background tint for card containers and secondary surfaces
- **Light Gray** (`#F7FAFC`): Alternative light background for section breaks and subtle contrast
- **Off-White** (`#F4F7FA`): Additional neutral background layer for nested sections
- **Border Gray** (`#ECF1F6`): Light borders and dividing lines
- **Medium Gray** (`#D4DEE9`): Secondary borders and subtle separators
- **Muted Gray** (`#C1C9D2`): Tertiary borders and disabled element text

### Surface & Borders

- **Card Background** (`#FFFFFF`): Primary container background with 85% opacity for translucent effect
- **Card Border** (`#C1C9D2`): 1px borders on cards and contained sections
- **Input Background** (`#FFFFFF`): Form input backgrounds matching primary white

### Shadow Colors

- **Subtle Shadow** (`rgba(60, 66, 87, 0.08)`): Ambient shadow for mild depth
- **Strong Shadow** (`rgba(0, 0, 0, 0.12)`): Secondary shadow layer for combined effect
- **Border Shadow** (`rgba(16, 17, 26, 0.16)`): Shadow emphasis on bordered elements

## 3. Typography Rules

### Font Family

**Primary Font:** `-apple-system` (San Francisco, Segoe UI, Helvetica Neue, sans-serif fallback stack)  
**Code Font:** `Menlo` (monospace for code blocks and technical snippets)

### Hierarchy

| Role              | Font          | Size | Weight | Line Height | Letter Spacing | Notes                                       |
| ----------------- | ------------- | ---- | ------ | ----------- | -------------- | ------------------------------------------- |
| Display / H1      | -apple-system | 32px | 700    | 40px        | 0px            | Marketing headlines and page titles         |
| Heading / H2      | -apple-system | 21px | 700    | 24px        | 0px            | Section headers and major subsections       |
| Body / Paragraph  | -apple-system | 16px | 400    | 26px        | 0px            | Primary content and list items              |
| Body Small        | -apple-system | 16px | 500    | 24px        | 0px            | Emphasized body text and highlights         |
| Label / Caption   | -apple-system | 14px | 600    | 20px        | 0px            | Form labels and button text                 |
| Link              | -apple-system | 14px | 600    | 20px        | 0px            | Text links and navigation items             |
| Link Secondary    | -apple-system | 14px | 400    | 20px        | 0px            | Secondary navigation and tertiary links     |
| Input / Form Text | -apple-system | 14px | 400    | 20px        | 0px            | Form input text and placeholders            |
| Code Block        | Menlo         | 13px | 400    | 19px        | 0px            | Technical code snippets and syntax examples |

### Principles

- **Hierarchy through weight:** Semantic emphasis achieved via font-weight variation (400 for body, 600+ for interactive elements)
- **Line-height for readability:** Generous line heights (1.5–1.6x) ensure comfortable reading in body text
- **Monospace separation:** Code uses Menlo to visually distinguish technical content from prose
- **Accessibility first:** Minimum 14px for interactive text, 13px only for code where context supports smaller sizing
- **System fonts:** Native system fonts ensure performance and platform consistency
- **Consistent scale:** Hierarchy uses predictable size steps (13px → 14px → 16px → 21px → 32px)

## 4. Component Stylings

### Buttons

**Primary Button (CTA)**

- Background: `#5469D4`
- Text Color: `#FFFFFF`
- Font Size: `14px`
- Font Weight: `600`
- Padding: `12px 20px`
- Border Radius: `8px`
- Border: `none`
- Box Shadow: `rgba(60, 66, 87, 0.08) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px`
- Line Height: `20px`
- Hover State: Background `#533AFD`, shadow intensifies
- Active State: Background `#3C4F69`, shadow minimal

**Secondary Button**

- Background: `#FFFFFF`
- Text Color: `#5469D4`
- Font Size: `14px`
- Font Weight: `400`
- Padding: `8px 16px`
- Border Radius: `8px`
- Border: `1px solid #D4DEE9`
- Box Shadow: `rgba(16, 17, 26, 0.16) 0px 1px 1px 0px, #D4DEE9 0px 0px 0px 1px`
- Line Height: `20px`
- Hover State: Background `#F7FAFC`, text darkens to `#3C4F69`
- Active State: Background `#ECF1F6`

**Ghost Button (Text Link)**

- Background: `transparent`
- Text Color: `#5469D4`
- Font Size: `14px`
- Font Weight: `500`
- Padding: `0px`
- Border Radius: `0px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `20px`
- Hover State: Text Color `#533AFD`, underline appears
- Active State: Text Color `#3C4F69`

### Cards & Containers

**Card with Shadow**

- Background: `rgba(255, 255, 255, 0.85)`
- Text Color: `#414552`
- Padding: `16px`
- Border Radius: `7px`
- Border: `1px solid #C1C9D2`
- Box Shadow: `rgba(60, 66, 87, 0.08) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px`
- Font Size: `14px`
- Line Height: `normal`

**Content Container**

- Background: `#FFFFFF`
- Padding: `24px 32px`
- Border Radius: `0px`
- Border: `none`
- Box Shadow: `none`
- Max Width: `1200px`

**Section Box**

- Background: `#F5FBFF`
- Padding: `20px 24px`
- Border Radius: `6px`
- Border: `1px solid #ECF1F6`
- Box Shadow: `none`

### Inputs & Forms

**Text Input**

- Background: `#FFFFFF`
- Text Color: `#273951`
- Font Size: `14px`
- Font Weight: `400`
- Padding: `8px 12px`
- Border Radius: `6px`
- Border: `1px solid #D4DEE9`
- Box Shadow: `none`
- Line Height: `20px`
- Placeholder Color: `#697386`
- Focus State: Border Color `#5469D4`, Box Shadow `0px 0px 0px 3px rgba(84, 105, 212, 0.1)`

**Form Label**

- Font Size: `14px`
- Font Weight: `600`
- Color: `#414552`
- Margin Bottom: `8px`
- Line Height: `20px`

**Search Input**

- Background: `#FFFFFF`
- Text Color: `#414552`
- Font Size: `14px`
- Padding: `8px 12px`
- Border Radius: `6px`
- Border: `1px solid #D4DEE9`
- Placeholder Text Color: `#697386`
- Icon Color: `#697386`

### Navigation

**Top Navigation Bar**

- Background: `#FFFFFF`
- Height: `64px`
- Border Bottom: `1px solid #ECF1F6`
- Padding: `0px 32px`
- Display: flex, align-items center, justify-content space-between

**Navigation Link**

- Font Size: `14px`
- Font Weight: `500`
- Color: `#414552`
- Padding: `8px 16px`
- Border Radius: `4px`
- Hover State: Color `#5469D4`, Background `#F5FBFF`
- Active State: Color `#5469D4`, Border Bottom `2px solid #5469D4`

**Dropdown Navigation**

- Background: `#FFFFFF`
- Border: `1px solid #ECF1F6`
- Border Radius: `6px`
- Box Shadow: `rgba(60, 66, 87, 0.08) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px`
- Min Width: `200px`

### Badges

**Success Badge**

- Background: `rgba(133, 217, 150, 0.1)`
- Text Color: `#85D996`
- Font Size: `12px`
- Font Weight: `600`
- Padding: `4px 8px`
- Border Radius: `4px`
- Border: `1px solid #85D996`

**Info Badge**

- Background: `rgba(84, 105, 212, 0.1)`
- Text Color: `#5469D4`
- Font Size: `12px`
- Font Weight: `600`
- Padding: `4px 8px`
- Border Radius: `4px`
- Border: `1px solid #5469D4`

### Code Blocks

**Code Container**

- Background: `#3C4257`
- Text Color: `#FFFFFF`
- Font Family: `Menlo`
- Font Size: `13px`
- Font Weight: `400`
- Padding: `16px`
- Border Radius: `6px`
- Line Height: `19px`
- Overflow: auto

**Code Syntax Highlighting**

- Keywords: `#85D996`
- Strings: `#97D8FF`
- Numbers: `#F2CC8F`
- Comments: `#697386`
- Operators: `#FFFFFF`

## 5. Layout Principles

### Spacing System

The spacing system uses a base unit of `4px`, scaled to common values used throughout the design:

- **4px**: Micro spacing within tightly grouped elements
- **8px**: Tight spacing between adjacent items
- **12px**: Internal padding for small components
- **16px**: Standard padding for containers and cards
- **20px**: Comfortable spacing for form elements
- **24px**: Section internal spacing and component gaps
- **28px**: Between major content blocks
- **32px**: Primary content area padding and large gaps
- **36px**: Between vertical sections
- **40px**: Gap between major layout sections
- **48px**: Large section spacing and content divisions
- **100px**: Hero section and full-page section separations

**Usage Context:**

- Buttons & badges: `8px–12px` padding
- Cards & containers: `16px–24px` padding
- Section gaps: `24px–48px`
- Page margins: `32px–48px`
- Micro interactions: `4px–8px`

### Grid & Container

**Max Width:**

- Desktop: `1200px`
- Tablet: `100% - 64px` (margins)
- Mobile: `100% - 32px` (margins)

**Column Strategy:**

- Desktop: 12-column grid with `16px` gutters
- Tablet: 8-column grid with `12px` gutters
- Mobile: Single column with `16px` side margins

**Section Patterns:**

- Full-width hero section (background extends edge-to-edge)
- Constrained content sections (max 1200px, centered)
- Sidebar layouts (main: 70%, sidebar: 30%)
- Three-column feature sections (equal width or 2:1 proportions)
- Two-column reference layouts (left nav, right content)

### Whitespace Philosophy

Whitespace is treated as a structural element, not empty space. Generous margins and padding create breathing room around content, reducing cognitive load. Vertical rhythm is maintained through consistent line heights and section spacing. Negative space guides the eye and establishes content priority. Content never feels cramped; instead, the system favors visual clarity through separation. Whitespace intensity increases from dense documentation sections to hero areas.

### Border Radius Scale

- **4px**: Tight radius for badge buttons and inline highlights
- **6px**: Standard radius for input fields and code blocks
- **7px**: Card and modal containers
- **8px**: Buttons and primary interactive elements

## 6. Depth & Elevation

| Level        | Treatment                                                                       | Use                                |
| ------------ | ------------------------------------------------------------------------------- | ---------------------------------- |
| Ground (0)   | No shadow, `border: 1px solid #ECF1F6`                                          | Flat content, text areas, inputs   |
| Raised (1)   | `rgba(60, 66, 87, 0.08) 0px 2px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px`   | Hovered buttons, active states     |
| Floating (2) | `rgba(60, 66, 87, 0.08) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px`  | Cards, popovers, modals            |
| Elevated (3) | `rgba(60, 66, 87, 0.1) 0px 12px 24px 0px, rgba(0, 0, 0, 0.15) 0px 6px 12px 0px` | Dropdowns, tooltips, context menus |

**Shadow Philosophy:**

The elevation system uses a dual-layer shadow approach: a soft ambient shadow (low opacity) combined with a sharper directional shadow. This creates depth without harshness. Shadows are subtle and primarily used to separate surfaces from their background, not to create dramatic depth. The system avoids deep, dark shadows—instead favoring soft, gray-based shadows that feel professional and trustworthy. Shadows increase in intensity and spread as elevation rises, but never become prominent or distracting.

## 7. Do's and Don'ts

### Do

- Use **#5469D4** (Primary Blue) for all primary CTAs and interactive focus states
- Maintain minimum **44px height** for touch targets on interactive elements
- Apply the card shadow treatment (`rgba(60, 66, 87, 0.08)...`) to floating containers
- Pair **#414552** (Primary Text) with **#FFFFFF** (White) backgrounds for optimal contrast
- Use **16px minimum font size** for body content and form inputs
- Implement consistent **8px padding** around button text
- Layer shadows using the dual-layer approach: ambient + directional
- Maintain **1.5x line-height** minimum for body paragraphs
- Group related form fields with **12px vertical spacing**
- Reserve **#85D996** exclusively for success and positive confirmations

### Don't

- Override button radius to values other than `6px`, `7px`, or `8px`
- Use colors outside the defined palette for semantic meaning
- Apply shadows to text or flat elements (shadows reserved for layered surfaces)
- Mix system fonts with custom web fonts without fallbacks
- Use font sizes smaller than **13px** outside code blocks
- Create interactive elements with less than **44px** clickable area
- Apply opacity effects to text colors (use defined palette colors instead)
- Nest cards deeper than three levels (use borders instead)
- Use `#414552` and `#FFFFFF` combinations for less critical text (hierarchy gets lost)
- Implement custom border-radius values—stick to the scale (4px, 6px, 7px, 8px)

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width      | Key Changes                                                                     |
| ---------- | ---------- | ------------------------------------------------------------------------------- |
| Mobile     | 0–600px    | Single column, full-width containers, `16px` padding, hidden desktop navigation |
| Tablet     | 600–1024px | Two-column layouts, `24px` padding, collapsible navigation                      |
| Desktop    | 1024px+    | Multi-column grids, max-width `1200px`, full navigation, `32px` padding         |
| Wide       | 1440px+    | Three-column layouts, increased spacing, enhanced spacing between sections      |

### Touch Targets

- **Minimum interactive area:** `44px × 44px` (buttons, links, inputs)
- **Recommended button height:** `40px–48px`
- **Minimum padding around clickable text:** `8px`
- **Input field minimum height:** `40px`
- **Toolbar icon spacing:** `16px` minimum between icons

### Collapsing Strategy

**Mobile (< 600px):**

- Stack all cards and containers vertically
- Hide secondary navigation; show hamburger menu
- Reduce section padding to `16px`
- Single-column layout for all grids
- Collapse three-column feature sections to single column
- Stack form labels above inputs

**Tablet (600–1024px):**

- Allow two-column layouts where applicable
- Show simplified navigation in header
- Increase padding to `20px–24px`
- Maintain readable line lengths (max 80 characters)
- Collapse nested sidebars

**Desktop (1024px+):**

- Full multi-column layouts
- Show complete navigation
- Apply standard `32px` padding
- Maintain `1200px` max-width for content
- Show all interactive states

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Primary Blue (`#5469D4`)
- **Primary Text:** Primary Text (`#414552`)
- **Background:** White (`#FFFFFF`)
- **Success State:** Success Green (`#85D996`)
- **Heading Text:** Primary Text (`#414552`) at 21px+ weight 700
- **Secondary Text:** Slate Gray (`#697386`)
- **Borders:** Medium Gray (`#D4DEE9`)
- **Card Background:** White with `rgba(255, 255, 255, 0.85)` and `1px #C1C9D2` border
- **Hover State (Button):** Dark Blue (`#533AFD`)
- **Input Background:** White with `1px #D4DEE9` border
- **Code Block:** Dark Slate (`#3C4257`) background, monospace `Menlo` 13px
- **Light Background Section:** Very Light Blue (`#F5FBFF`)
- **Disabled Text:** Muted Gray (`#C1C9D2`)

### Iteration Guide

1. **Colors are semantic, not arbitrary.** Every color in the palette has a specific purpose. Use `#5469D4` for primary actions, never for secondary content. Use `#414552` for body text, never for decorative elements.

2. **Typography is hierarchical through weight, not size alone.** Body uses 16px weight 400; labels use 14px weight 600. Size steps are 13px → 14px → 16px → 21px → 32px. Do not introduce intermediate sizes.

3. **Spacing follows the 4px base unit scale.** All padding and margins must align to: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 100px. No arbitrary values.

4. **Shadows are always dual-layer.** Combine ambient (`rgba(60, 66, 87, 0.08)`) with directional shadow (`rgba(0, 0, 0, 0.12)`). Never use single-layer or custom shadow values.

5. **Button radius is either 6px, 7px, or 8px.** Input fields use 6px; cards use 7px; primary buttons use 8px. Never use other radius values.

6. **Interactive elements must be at least 44px × 44px.** Touch targets smaller than this violate accessibility standards.

7. **Line height is 1.5x for body (24px for 16px text), 1.67x for headings.** Smaller sizes (13px code) use 19px line height for consistency.

8. **Contrast ratios must meet WCAG AA standards.** Primary text (`#414552`) on white passes; secondary text (`#697386`) on white passes at sizes 16px+.

9. **Cards receive the full Floating shadow treatment.** Always apply: `rgba(60, 66, 87, 0.08) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px` plus a `1px #C1C9D2` border.

10. **Forms use 14px font weight 400 for input text and weight 600 for labels.** All labels appear above inputs with 8px bottom margin. Input height is 40px minimum.
