package st.hcmuaf.edu.vn.sche_treatment_project_api.Utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtTokenUtils {
    @Value("${jwt.expiration}")
    private int expiration; // 30days

    @Value("${jwt.expiration-min}")
    private int expirationMin; // 15minus

    @Value("${jwt.secretKey}")
    private String secretKey;
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtils.class);

    public String generateToken(Account account) {
        //properties => claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountPhone", account.getAccountPhone());
        claims.put("accountId", account.getId());
        try {
            String token = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(account.getAccountPhone())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
                    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                    .compact();
            return token;
        } catch (Exception e) {
            logger.error("Cannot create jwt token, error: " + e.getMessage());
            return null;
        }
    }
    public String generateTokenMin(Account account) {
        //properties => claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountPhone", account.getAccountPhone());
        claims.put("accountId", account.getId());
        try {
            String token = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(account.getId())
                    .setExpiration(new Date(System.currentTimeMillis() + expirationMin * 1000L))
                    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                    .compact();
            return token;
        } catch (Exception e) {
            logger.error("Cannot create jwt token, error: " + e.getMessage());
            return null;
        }
    }

    private Key getSignInKey() {
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(bytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = this.extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //check expiration
    public boolean isTokenExpired(String token) {
        Date expirationDate = this.extractClaim(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.info("Invalid JWT signature {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.info("Invalid JWT token {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.info("Invalid JWT expired {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.info("Invalid JWT unsupported {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.info("Invalid JWT empty {}", e.getMessage());
        }
        return false;
    }
}
