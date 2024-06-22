//
//  WaintingForLocalAuthentication.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 20.06.24.
//

import SwiftUI

struct WaintingForLocalAuthentication: View {
    var body: some View {
        ZStack {
            Color(.systemBackground)
            
            VStack {
                Spacer()
                ProgressView("Waiting for local Authentication...")
                    .progressViewStyle(CircularProgressViewStyle(tint: .blue))
                    .padding()
                Spacer()
            }
            
        }
    }
}
