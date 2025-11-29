
import os

style_path = r'd:\MY CODES\gadget-2\gadget360\style.css'

# Correct content from revealBlock onwards
restored_css = """
@keyframes revealBlock {
    0% { transform: translateX(-101%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(101%); }
}

/* Scroll Progress Bar */
.scroll-progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    z-index: 9999;
    background: transparent;
}

.scroll-progress-bar {
    height: 100%;
    background: var(--color-primary);
    width: 0%;
    transition: width 0.1s;
}

/* Floating Support Button */
.support-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 24px;
    box-shadow: 0 10px 25px rgba(112, 0, 255, 0.4);
    z-index: 1000;
    cursor: pointer;
    animation: float 3s ease-in-out infinite;
    transition: transform 0.3s, box-shadow 0.3s;
}

.support-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px var(--color-primary);
    animation-play-state: paused;
}

/* Marquee / Brands Carousel */
.brands-marquee {
    background: #111;
    padding: 15px 0;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    border-top: 1px solid #222;
    border-bottom: 1px solid #222;
}

.marquee-track {
    display: inline-block;
    animation: marqueeScroll 30s linear infinite;
}

.brands-marquee:hover .marquee-track {
    animation-play-state: paused;
}

.brand-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 40px;
    opacity: 0.5;
    transition: opacity 0.3s;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.brand-item:hover {
    opacity: 1;
    color: var(--color-primary);
}

@keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

/* Product Card Hover Zoom */
.product-card .product-image img {
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.product-card:hover .product-image img {
    transform: scale(1.1);
}

/* Profile Page */
.profile-page {
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);
}

.profile-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
}

.profile-avatar {
    width: 100px;
    height: 100px;
    background: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
}

.profile-info h1 {
    font-size: 2rem;
    margin-bottom: 5px;
}

.profile-info p {
    color: var(--color-text-muted);
    margin-bottom: 10px;
}

.badge-gold {
    background: linear-gradient(45deg, #FFD700, #FFA500);
    color: #000;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 700;
}

.profile-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--spacing-xl);
}

.profile-sidebar {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.profile-tab {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    width: 100%;
    text-align: left;
    background: transparent;
    color: var(--color-text-muted);
    border-radius: var(--radius-md);
    transition: all 0.2s;
    font-weight: 500;
}

.profile-tab:hover,
.profile-tab.active {
    background: #222;
    color: #fff;
}

.profile-tab.active {
    background: var(--color-primary);
    color: #fff;
}

.profile-tab.logout {
    margin-top: 20px;
    color: var(--color-danger);
}

.profile-tab.logout:hover {
    background: rgba(220, 53, 69, 0.1);
}

.tab-pane {
    display: none;
    animation: fadeIn 0.3s ease;
}

.tab-pane.active {
    display: block;
}

.tab-pane h2 {
    margin-bottom: var(--spacing-lg);
    font-size: 1.5rem;
}

/* Order Card */
.order-card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 20px;
    margin-bottom: 20px;
}

.order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--color-border);
}

.order-id {
    font-weight: 700;
    margin-right: 10px;
}

.order-date {
    color: var(--color-text-muted);
    font-size: 0.9rem;
}

.status {
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.status-delivered {
    background: rgba(40, 167, 69, 0.2);
    color: var(--color-success);
}

.status-processing {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
}

.order-items {
    margin-bottom: 15px;
}

.order-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.order-item img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
}

.order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid var(--color-border);
}

/* Address Card */
.address-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.address-card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 20px;
    position: relative;
}

.address-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.address-card.new-address {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-style: dashed;
    cursor: pointer;
    min-height: 200px;
    color: var(--color-text-muted);
    transition: all 0.2s;
}

.address-card.new-address:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 40px;
    background: var(--color-bg-card);
    border-radius: var(--radius-md);
}

.icon-box {
    width: 60px;
    height: 60px;
    background: #222;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: var(--color-text-muted);
}

@media (max-width: 768px) {
    .profile-layout {
        grid-template-columns: 1fr;
    }
    
    .profile-sidebar {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 10px;
    }
    
    .profile-tab {
        white-space: nowrap;
        width: auto;
    }
}
"""

with open(style_path, 'rb') as f:
    content = f.read()

lines = content.splitlines(keepends=True)

# Find line 1872 (start of revealBlock)
# Line 1872 is 0-indexed 1871.
# But since I messed up the file, the line numbers might have shifted or content changed.
# I should search for "@keyframes revealBlock"
start_index = -1
for i, line in enumerate(lines):
    if b'@keyframes revealBlock' in line:
        start_index = i
        break

if start_index != -1:
    print(f"Found start at line {start_index + 1}")
    valid_lines = lines[:start_index]
    
    with open(style_path, 'wb') as f:
        f.writelines(valid_lines)
        f.write(restored_css.encode('utf-8'))
    print("Restored style.css")
else:
    print("Could not find @keyframes revealBlock")
