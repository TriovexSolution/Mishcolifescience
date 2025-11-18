import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="row mb-5" style={{ backgroundColor: "#EAF5FF" }}>
        <div className="col-12 text-center py-5">
          <h1
            className="display-5 fw-bold"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-muted" style={{ fontFamily: "Inter, sans-serif" }}>
            Last Updated on 27th January 2022
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-3 px-md-5 mb-5">
        {/* Section 1 */}
        <div className="mb-5">
          <h4
            className="fw-bold mb-3"
            style={{
              fontFamily: "Sen, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 36px)",
              lineHeight: "1.4",
              letterSpacing: "-1px",
            }}
          >
            Lorem ipsum dolor sit amet
          </h4>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: "1.8",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-5">
          <h4
            className="fw-bold mb-3"
            style={{
              fontFamily: "Sen, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 36px)",
              lineHeight: "1.4",
              letterSpacing: "-1px",
            }}
          >
            Sed do eiusmod tempor incididunt
          </h4>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: "1.8",
            }}
          >
            Non blandit massa enim nec scelerisque. Neque egestas congue quisque
            egestas diam in arcu. Risus in hendrerit gravida rutrum quisque non.
            Sit amet nulla facilisi morbi tempus iaculis urna. Lorem sed risus
            ultricies tristique nulla aliquet enim. Volutpat blandit aliquam
            etiam erat velit. Orci eu lobortis elementum nibh. Ipsum
            suspendisse ultrices gravida dictum fusce ut placerat orci nulla.
            Neque convallis a cras semper auctor neque vitae tempus quam.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-5">
          <h4
            className="fw-bold mb-3"
            style={{
              fontFamily: "Sen, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 36px)",
              lineHeight: "1.4",
              letterSpacing: "-1px",
            }}
          >
            Ut enim ad minim veniam
          </h4>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: "1.8",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Non blandit massa enim nec
            scelerisque. Neque egestas congue quisque egestas diam in arcu.
          </p>
        </div>
      </div>
    </div>
  );
}
