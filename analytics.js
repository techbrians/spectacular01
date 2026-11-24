/* TECH CREATIVE STUDIO - WEBSITE ANALYTICS */

// Your Supabase project details
const SUPABASE_URL = "https://vogpmtgxnroqfcouhzrp.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_3x37995UFQnZCcai4fnnvQ_K3evvm9S";

// Create Supabase connection
const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Create a visitor ID
let visitorId = localStorage.getItem("techCreativeVisitor");

if (!visitorId) {
    visitorId = crypto.randomUUID();

    localStorage.setItem(
        "techCreativeVisitor",
        visitorId
    );
}

// Record website activity
async function trackEvent(eventType) {
    const { error } = await supabaseClient
        .from("website_events")
        .insert({
            event_type: eventType,
            visitor_id: visitorId,
            page_path: window.location.pathname
        });

    if (error) {
        console.error("Tracking error:", error.message);
    }
}

// Track page visit
trackEvent("page_view");

// Track Facebook and WhatsApp clicks
document.querySelectorAll("a").forEach(function(link) {

    const url = link.href.toLowerCase();

    if (url.includes("facebook.com")) {
        link.addEventListener("click", function() {
            trackEvent("facebook_click");
        });
    }

    if (url.includes("wa.me") ||
        url.includes("whatsapp.com")) {

        link.addEventListener("click", function() {
            trackEvent("whatsapp_click");
        });
    }

});