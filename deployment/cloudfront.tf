locals {
  s3_origin_id   = "${local.s3_name}-origin"
  s3_domain_name = "${local.s3_name}.s3.${var.region}.amazonaws.com"
}


resource "aws_cloudfront_origin_access_control" "cloudfront_s3_oac" {
  name                              = "CloudFront S3 OAC"
  description                       = "Cloud Front S3 OAC"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


resource "aws_cloudfront_distribution" "this" {

  enabled = true

  origin {
    origin_id                = local.s3_origin_id
    domain_name              = local.s3_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_s3_oac.id
  }

  default_cache_behavior {

    target_origin_id = local.s3_origin_id
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.this.arn
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [
    var.domain_name
  ]

  viewer_certificate {
    acm_certificate_arn           = var.certificate_arn
    ssl_support_method            = "sni-only"
  }

  price_class = "PriceClass_100"

}


resource "aws_cloudfront_function" "this" {
  name        = "cloudfront-rewrite-urls"
  comment     = "Rewrite URLs to index.html"
  runtime     = "cloudfront-js-2.0"
  code = <<EOF
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (!uri.startsWith('/assets/')) {
        request.uri = '/index.html';
    }

    return request;
}
EOF
}
